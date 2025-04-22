class RedemptionsController < ApplicationController
  # GET /redemptions
  def index
    page = params[:page].to_i > 0 ? params[:page].to_i : 1
    per_page = params[:per_page].to_i > 0 ? params[:per_page].to_i : 20
    user_redemptions = current_user.redemptions.includes(:reward)
    redemptions = user_redemptions.offset((page - 1) * per_page).limit(per_page)
    total = user_redemptions.count
    render json: {
      redemptions: redemptions.as_json(include: :reward),
      pagination: {
        page: page,
        per_page: per_page,
        total: total,
        total_pages: (total / per_page.to_f).ceil
      }
    }
  end

  # GET /redemptions/:id
  def show
    redemption = Redemption.includes(:reward).find_by(id: params[:id], user_id: current_user.id)
    if redemption
      render json: redemption.as_json(include: :reward)
    else
      render json: { error: "Redemption not found" }, status: :not_found
    end
  end

  # POST /redemptions
  def create
    reward = Reward.find_by(id: redemption_params[:reward_id])
    quantity = redemption_params[:quantity].to_i
    if reward.nil?
      render json: { error: 'Reward not found' }, status: :not_found and return
    end
    if quantity <= 0
      render json: { error: 'Quantity must be greater than 0' }, status: :unprocessable_entity and return
    end
    if quantity > reward.quantity
      render json: { error: 'Not enough quantity available' }, status: :unprocessable_entity and return
    end
    total_cost = reward.value_per_unit * quantity
    if current_user.balance_points < total_cost
      render json: { error: 'Not enough points to redeem' }, status: :unprocessable_entity and return
    end
    redemption = nil
    ActiveRecord::Base.transaction do
      redemption = Redemption.new(user_id: current_user.id, reward_id: reward.id, quantity: quantity)
      redemption.save!
      current_user.update!(balance_points: current_user.balance_points - total_cost)
      reward.update!(quantity: reward.quantity - quantity)
    end
    render json: redemption, status: :created
  rescue ActiveRecord::RecordInvalid, ActiveRecord::RecordNotSaved => e
    render json: { error: redemption&.errors&.full_messages&.join(", ") || e.message }, status: :unprocessable_entity
  end

  private

  def redemption_params
    params.require(:redemption).permit(:reward_id, :quantity)
  end
end
