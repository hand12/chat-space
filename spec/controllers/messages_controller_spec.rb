require 'rails_helper'

describe MessagesController, type: :controller do
  let!(:create_params){{
    body: "サンプル"
  }}
  describe 'GET #index' do
    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET #create' do
    it "create new message" do
      expect{
        xhr :post, :create, message: create_params
      }.to change(Message, :count).by(1)
    end
  end
end
