require 'swagger_helper'

describe 'Rewards API', type: :request do
  let(:admin) { create(:user, :admin) }
  let(:user) { create(:user) }
  let(:auth_headers) { |u| { 'Authorization' => "Bearer #{JsonWebToken.encode(user_id: u.id, role: u.role)}" } }

  path '/rewards' do
    get('List rewards') do
      tags 'Rewards'
      response(200, 'successful') do
        produces 'application/json'
        schema type: :object, properties: {
          current_page: { type: :integer },
          total_pages: { type: :integer },
          total_count: { type: :integer },
          rewards: {
            type: :array,
            items: {
              type: :object,
              properties: {
                id: { type: :integer },
                title: { type: :string },
                description: { type: :string },
                value_per_unit: { type: :integer },
                quantity: { type: :integer }
              },
              required: %w[id title description value_per_unit quantity]
            }
          }
        },
        required: %w[current_page total_pages total_count rewards]
        run_test!
      end
    end
    post('Create reward') do
      tags 'Rewards'
      security [bearer_auth: []]
      consumes 'application/json'
      parameter name: :reward, in: :body, schema: {
        type: :object,
        properties: {
          title: { type: :string },
          description: { type: :string },
          value_per_unit: { type: :integer },
          quantity: { type: :integer }
        },
        required: %w[title description value_per_unit quantity]
      }
      response(201, 'created') do
        let(:Authorization) { auth_headers[admin][:Authorization] }
        let(:reward) { attributes_for(:reward) }
        produces 'application/json'
        run_test!
      end
      response(403, 'forbidden') do
        let(:Authorization) { auth_headers[user][:Authorization] }
        let(:reward) { attributes_for(:reward) }
        run_test!
      end
    end
  end
  path '/rewards/{id}' do
    parameter name: :id, in: :path, type: :integer
    get('Show reward') do
      tags 'Rewards'
      response(200, 'found') do
        produces 'application/json'
        run_test!
      end
      response(404, 'not found') do
        let(:id) { -1 }
        run_test!
      end
    end
    put('Update reward') do
      tags 'Rewards'
      security [bearer_auth: []]
      consumes 'application/json'
      parameter name: :reward, in: :body, schema: {
        type: :object,
        properties: {
          title: { type: :string },
          description: { type: :string },
          value_per_unit: { type: :integer },
          quantity: { type: :integer }
        }
      }
      response(200, 'updated') do
        let(:Authorization) { auth_headers[admin][:Authorization] }
        let(:reward) { attributes_for(:reward) }
        produces 'application/json'
        run_test!
      end
      response(403, 'forbidden') do
        let(:Authorization) { auth_headers[user][:Authorization] }
        let(:reward) { attributes_for(:reward) }
        run_test!
      end
    end
    delete('Delete reward') do
      tags 'Rewards'
      security [bearer_auth: []]
      response(204, 'no content') do
        let(:Authorization) { auth_headers[admin][:Authorization] }
        run_test!
      end
      response(403, 'forbidden') do
        let(:Authorization) { auth_headers[user][:Authorization] }
        run_test!
      end
    end
  end
end
