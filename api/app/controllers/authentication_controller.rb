class AuthenticationController < ApplicationController
  skip_before_action :authenticate_request, only: [:login, :refresh, :signup]
  # POST /authentication/login
  def login
    permited_params = params.permit(:email, :password)
    user = User.find_by(email: permited_params[:email])
    logger.info user
    if user&.authenticate(permited_params[:password])
      token = JsonWebToken.encode(user_id: user.id, role: user.role)
      refresh_token = JsonWebToken.encode({ user_id: user.id, role: user.role }, 7.days.from_now)
      render json: { token: token, refresh_token: refresh_token }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  # POST /authentication/refresh
  def refresh
    refresh_token = params.dig(:refresh, :refresh_token)
    decoded = JsonWebToken.decode(refresh_token)
    if decoded && decoded[:user_id]
      user = User.find_by(id: decoded[:user_id])
      if user
        token = JsonWebToken.encode(user_id: user.id, role: user.role)
        new_refresh_token = JsonWebToken.encode({ user_id: user.id, role: user.role }, 7.days.from_now)
        render json: { token: token, refresh_token: new_refresh_token }, status: :ok
      else
        render json: { error: 'Invalid refresh token' }, status: :unauthorized
      end
    else
      render json: { error: 'Invalid refresh token' }, status: :unauthorized
    end
  end

  # PATCH /authentication/change_password
  def change_password
    pw_params = change_password_params
    unless current_user&.authenticate(pw_params[:current_password])
      render json: { error: 'Current password incorrect' }, status: :unauthorized and return
    end
    if pw_params[:new_password].blank?
      render json: { error: 'New password required' }, status: :unprocessable_entity and return
    end
    if current_user.update(password: pw_params[:new_password])
      render json: { message: 'Password changed successfully' }, status: :ok
    else
      render json: { error: current_user.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end
 
 # POST /authentication/signup
  def signup
    user = User.new(signup_params.merge(role: 1, balance_points: 1000))
    if user.save
      token = JsonWebToken.encode(user_id: user.id, role: user.role)
      refresh_token = JsonWebToken.encode({ user_id: user.id, role: user.role }, 7.days.from_now)
      render json: { token: token, refresh_token: refresh_token }, status: :ok
    else
      render json: { error: user.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  private

  def change_password_params
    params.require(:passwords).permit(:current_password, :new_password)
  end

  def signup_params
    logger.info params
    params.permit(:email, :password, :password_confirmation)
  end
end
