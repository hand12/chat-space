require 'rails_helper'
describe Message do
  describe '#create' do
    it "invalid withoiut a body" do
      message = build(:message, body: "")
      message.valid?
      expect(message.errors[:body]).to include("can't be blank")
    end
    it "valid with all atributes" do
      expect(build(:message)).to be_valid
    end
  end
end
