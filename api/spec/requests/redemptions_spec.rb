require 'swagger_helper'

describe 'Redemptions API', type: :request do
  let(:admin) { create(:user, :admin) }
  let(:user) { create(:user) }
  let(:reward) { create(:reward, quantity: 10, value_per_unit: 5) }
  let(:auth_headers) { |u| { 'Authorization' => "Bearer #{JsonWebToken.encode(user_id: u.id, role: u.role)}" } }

  path '/redemptions' do
    get('List redemptions') do
      tags 'Redemptions'
      security [bearer_auth: []]
      response(200, 'successful') do
        let(:Authorization) { auth_headers[user][:Authorization] }
        produces 'application/json'
        schema type: :object, properties: {
          current_page: { type: :integer },
          total_pages: { type: :integer },
          total_count: { type: :integer },
          redemptions: {
            type: :array,
            items: {
              type: :object,
              properties: {
                id: { type: :integer },
                user_id: { type: :integer },
                reward: {
                  type: :object,
                  properties: {
                    id: { type: :integer },
                    title: { type: :string },
                    description: { type: :string },
                    value_per_unit: { type: :integer },
                    quantity: { type: :integer }
                  },
                  required: %w[id title description value_per_unit quantity]
                },
                quantity: { type: :integer },
                created_at: { type: :string, format: :date_time },
                updated_at: { type: :string, format: :date_time }
              },
              required: %w[id user_id reward quantity created_at updated_at]
            }
          }
        },
        required: %w[current_page total_pages total_count redemptions]
        run_test!
      end
      response(401, 'unauthorized') do
        let(:Authorization) { nil }
        run_test!
      end
    end
    post('Create redemption') do
      tags 'Redemptions'
      security [bearer_auth: []]
      consumes 'application/json'
      parameter name: :redemption, in: :body, schema: {
        type: :object,
        properties: {
          reward_id: { type: :integer },
          quantity: { type: :integer }
        },
        required: %w[reward_id quantity]
      }
      response(201, 'created') do
        let(:Authorization) { auth_headers[user][:Authorization] }
        let(:redemption) { { reward_id: reward.id, quantity: 2 } }
        produces 'application/json'
        run_test!
      end
      response(422, 'not enough points') do
        let(:Authorization) { auth_headers[user][:Authorization] }
        before { user.update(balance_points: 0) }
        let(:redemption) { { reward_id: reward.id, quantity: 2 } }
        run_test!
      end
      response(422, 'not enough quantity') do
        let(:Authorization) { auth_headers[user][:Authorization] }
        let(:redemption) { { reward_id: reward.id, quantity: 999 } }
        run_test!
      end
      response(401, 'unauthorized') do
        let(:Authorization) { nil }
        let(:redemption) { { reward_id: reward.id, quantity: 2 } }
        run_test!
      end
    end
  end
  path '/redemptions/{id}' do
    parameter name: :id, in: :path, type: :integer
    get('Show redemption') do
      tags 'Redemptions'
      security [bearer_auth: []]
      response(200, 'found') do
        let(:Authorization) { auth_headers[user][:Authorization] }
        let(:id) { create(:redemption, user: user, reward: reward).id }
        produces 'application/json'
        run_test!
      end
      response(404, 'not found') do
        let(:Authorization) { auth_headers[user][:Authorization] }
        let(:id) { -1 }
        run_test!
      end
      response(403, 'forbidden') do
        let(:Authorization) { auth_headers[user][:Authorization] }
        let(:id) { create(:redemption, user: admin, reward: reward).id }
        run_test!
      end
    end
  end
end
