class UsersController < ApplicationController
  before_action :require_admin, except: [:show]

  # GET /users
  def index
    page = params[:page].to_i > 0 ? params[:page].to_i : 1
    per_page = params[:per_page].to_i > 0 ? params[:per_page].to_i : 20
    users = User.offset((page - 1) * per_page).limit(per_page)
    total = User.count
    render json: {
      users: users,
      pagination: {
        page: page,
        per_page: per_page,
        total: total,
        total_pages: (total / per_page.to_f).ceil
      }
    }
  end

  # GET /users/:id
  def show
    user = User.find_by(id: params[:id])
    if user && (current_user.admin? || user.id == current_user.id)
      render json: user
    else
      render json: { error: 'Forbidden' }, status: :forbidden
    end
  end

  # POST /users
  def create
    user = User.new(user_params)
    if user.save
      render json: user, status: :created
    else
      render json: { error: user.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  # PUT/PATCH /users/:id
  def update
    user = User.find_by(id: params[:id])
    if user&.update(user_params)
      render json: user
    else
      render json: { error: user&.errors&.full_messages&.join(', ') || 'User not found' }, status: :unprocessable_entity
    end
  end

  # DELETE /users/:id
  def destroy
    user = User.find_by(id: params[:id])
    if user&.destroy
      head :no_content
    else
      render json: { error: 'User not found' }, status: :not_found
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :role, :balance_points)
  end

  def require_admin
    unless current_user&.admin?
      render json: { error: 'Forbidden: admin access required' }, status: :forbidden
    end
  end
end
