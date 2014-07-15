module ApplicationHelper
  def sign_in(user)
    session[:current_user_id] = user.id
  end
  
  def current_user
    @current_user ||= User.find_by_id(session[:current_user_id])
    return @current_user
  end
  
  def sign_out()
    session.delete(:current_user_id)
  end
end
