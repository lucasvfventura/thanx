class RewardsController < ApplicationController
  skip_before_action :authenticate_request, only: [:index, :show]
  before_action :require_admin, only: [:create, :update, :destroy]

  # GET /rewards
  def index
    page = params[:page].to_i > 0 ? params[:page].to_i : 1
    per_page = params[:per_page].to_i > 0 ? params[:per_page].to_i : 20
    rewards = Reward.offset((page - 1) * per_page).limit(per_page)
    total = Reward.count
    render json: {
      rewards: rewards,
      pagination: {
        page: page,
        per_page: per_page,
        total: total,
        total_pages: (total / per_page.to_f).ceil
      }
    }
  end

  # GET /rewards/:id
  def show
    reward = Reward.find_by(id: params[:id])
    if reward
      render json: reward
    else
      render json: { error: 'Reward not found' }, status: :not_found
    end
  end

  # POST /rewards
  def create
    reward = Reward.new(reward_params)
    if reward.save
      render json: reward, status: :created
    else
      render json: { error: reward.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  # PUT/PATCH /rewards/:id
  def update
    reward = Reward.find_by(id: params[:id])
    if reward&.update(reward_params)
      render json: reward
    else
      render json: { error: reward&.errors&.full_messages&.join(', ') || 'Reward not found' }, status: :unprocessable_entity
    end
  end

  # DELETE /rewards/:id
  def destroy
    reward = Reward.find_by(id: params[:id])
    if reward&.destroy
      head :no_content
    else
      render json: { error: 'Reward not found' }, status: :not_found
    end
  end

  private

  def reward_params
    params.require(:reward).permit(:title, :description, :value_per_unit, :quantity)
  end

  def require_admin
    unless current_user&.admin?
      render json: { error: 'Forbidden: admin access required' }, status: :forbidden
    end
  end
end
