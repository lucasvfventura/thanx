require 'swagger_helper'

describe 'Authentication API', type: :request do
  path '/authentication/login' do
    post('User login') do
      tags 'Authentication'
      consumes 'application/json'
      parameter name: :credentials, in: :body, schema: {
        type: :object,
        properties: {
          email: { type: :string },
          password: { type: :string }
        },
        required: %w[email password]
      }
      
      response(200, 'successful') do
        produces 'application/json'
        schema type: :object, properties: { token: { type: :string }, refresh_token: { type: :string } }
        run_test!
      end
      
      response(401, 'unauthorized') do
        schema type: :object, properties: { error: { type: :string } }
        run_test!
      end
    end
  end

  path '/authentication/refresh' do
    post('Refresh JWT') do
      tags 'Authentication'
      consumes 'application/json'
      parameter name: :refresh, in: :body, schema: {
        type: :object,
        properties: {
          refresh_token: { type: :string }
        },
        required: ['refresh_token']
      }
      
      response(200, 'successful') do
        produces 'application/json'
        schema type: :object, properties: { token: { type: :string }, refresh_token: { type: :string } }
        run_test!
      end
      
      response(401, 'unauthorized') do
        schema type: :object, properties: { error: { type: :string } }
        run_test!
      end
    end
  end

  path '/authentication/change_password' do
    patch('Change user password') do
      tags 'Authentication'
      security [bearer_auth: []]
      consumes 'application/json'
      parameter name: :passwords, in: :body, schema: {
        type: :object,
        properties: {
          current_password: { type: :string },
          new_password: { type: :string }
        },
        required: %w[current_password new_password]
      }
      
      response(200, 'password changed') do
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: create(:user).id)}" }
        produces 'application/json'
        schema type: :object, properties: { message: { type: :string } }
        run_test!
      end
      
      response(401, 'current password incorrect') do
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: create(:user).id)}" }
        schema type: :object, properties: { error: { type: :string } }
        run_test!
      end
      
      response(422, 'invalid new password') do
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: create(:user).id)}" }
        schema type: :object, properties: { error: { type: :string } }
        run_test!
      end
    end
  end

  path '/authentication/signup' do
    post('User sign up') do
      tags 'Authentication'
      consumes 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          email: { type: :string },
          password: { type: :string },
          password_confirmation: { type: :string }
        },
        required: %w[email password password_confirmation]
      }
      
      response(200, 'successful signup') do
        produces 'application/json'
        schema type: :object, properties: { token: { type: :string }, refresh_token: { type: :string } }
        run_test!
      end
      
      response(422, 'invalid signup') do
        schema type: :object, properties: { error: { type: :string } }
        run_test!
      end
    end
  end
end
