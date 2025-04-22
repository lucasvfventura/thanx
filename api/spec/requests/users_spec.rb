require 'swagger_helper'

describe 'Users API', type: :request do
  let(:admin) { create(:user, :admin) }
  let(:user) { create(:user) }
  let(:auth_headers) { |u| { 'Authorization' => "Bearer #{JsonWebToken.encode(user_id: u.id, role: u.role)}" } }

  path '/users' do
    get('List users') do
      tags 'Users'
      security [bearer_auth: []]
      response(200, 'successful') do
        let(:Authorization) { auth_headers[admin][:Authorization] }
        produces 'application/json'
        schema type: :object, properties: {
          current_page: { type: :integer },
          total_pages: { type: :integer },
          total_count: { type: :integer },
          users: {
            type: :array,
            items: {
              type: :object,
              properties: {
                id: { type: :integer },
                email: { type: :string },
                role: { type: :integer },
                balance_points: { type: :integer },
                created_at: { type: :string, format: :date_time },
                updated_at: { type: :string, format: :date_time }
              },
              required: %w[id email role balance_points created_at updated_at]
            }
          }
        }, required: %w[current_page total_pages total_count users]
        run_test!
      end
      response(403, 'forbidden') do
        let(:Authorization) { auth_headers[user][:Authorization] }
        run_test!
      end
    end
    post('Create user') do
      tags 'Users'
      security [bearer_auth: []]
      consumes 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          email: { type: :string },
          password: { type: :string },
          password_confirmation: { type: :string },
          role: { type: :integer },
          balance_points: { type: :integer }
        },
        required: %w[email password password_confirmation role balance_points]
      }
      response(201, 'created') do
        let(:Authorization) { auth_headers[admin][:Authorization] }
        let(:user) { attributes_for(:user) }
        produces 'application/json'
        schema type: :object, properties: {
          id: { type: :integer },
          email: { type: :string },
          role: { type: :integer },
          balance_points: { type: :integer },
          created_at: { type: :string, format: :date_time },
          updated_at: { type: :string, format: :date_time }
        }, required: %w[id email role balance_points created_at updated_at]
        run_test!
      end
      response(403, 'forbidden') do
        let(:Authorization) { auth_headers[user][:Authorization] }
        let(:user) { attributes_for(:user) }
        run_test!
      end
    end
  end

  path '/users/{id}' do
    parameter name: :id, in: :path, type: :integer
    get('Show user') do
      tags 'Users'
      security [bearer_auth: []]
      response(200, 'successful') do
        let(:id) { user.id }
        let(:Authorization) { auth_headers[user][:Authorization] }
        produces 'application/json'
        schema type: :object, properties: {
          id: { type: :integer },
          email: { type: :string },
          role: { type: :integer },
          balance_points: { type: :integer },
          created_at: { type: :string, format: :date_time },
          updated_at: { type: :string, format: :date_time }
        }, required: %w[id email role balance_points created_at updated_at]
        run_test!
      end
      response(403, 'forbidden') do
        let(:id) { user.id }
        let(:Authorization) { auth_headers[admin][:Authorization].sub(admin.id.to_s, (user.id + 1).to_s) }
        run_test!
      end
    end
    put('Update user') do
      tags 'Users'
      security [bearer_auth: []]
      consumes 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          email: { type: :string },
          password: { type: :string },
          password_confirmation: { type: :string },
          role: { type: :integer },
          balance_points: { type: :integer }
        }
      }
      response(200, 'updated') do
        let(:id) { user.id }
        let(:Authorization) { auth_headers[admin][:Authorization] }
        let(:user) { attributes_for(:user) }
        produces 'application/json'
        schema type: :object, properties: {
          id: { type: :integer },
          email: { type: :string },
          role: { type: :integer },
          balance_points: { type: :integer },
          created_at: { type: :string, format: :date_time },
          updated_at: { type: :string, format: :date_time }
        }, required: %w[id email role balance_points created_at updated_at]
        run_test!
      end
      response(403, 'forbidden') do
        let(:id) { user.id }
        let(:Authorization) { auth_headers[user][:Authorization] }
        let(:user) { attributes_for(:user) }
        run_test!
      end
    end
    delete('Delete user') do
      tags 'Users'
      security [bearer_auth: []]
      response(204, 'no content') do
        let(:id) { user.id }
        let(:Authorization) { auth_headers[admin][:Authorization] }
        run_test!
      end
      response(403, 'forbidden') do
        let(:id) { user.id }
        let(:Authorization) { auth_headers[user][:Authorization] }
        run_test!
      end
    end
  end
end
