# Hack environment parameters
Maestrano::Configuration::EVT_CONFIG['production'].merge!(
  'api.host' => 'http://localhost:3000',
  'sso.idp'  => 'http://localhost:3000',
  'sso.name_id_format'   => Maestrano::Saml::Settings::NAMEID_PERSISTENT,
  'sso.x509_fingerprint' => '01:06:15:89:25:7d:78:12:28:a6:69:c7:de:63:ed:74:21:f9:f5:36',
  'sso.x509_certificate' => "-----BEGIN CERTIFICATE-----\nMIIDezCCAuSgAwIBAgIJAOehBr+YIrhjMA0GCSqGSIb3DQEBBQUAMIGGMQswCQYD\nVQQGEwJBVTEMMAoGA1UECBMDTlNXMQ8wDQYDVQQHEwZTeWRuZXkxGjAYBgNVBAoT\nEU1hZXN0cmFubyBQdHkgTHRkMRYwFAYDVQQDEw1tYWVzdHJhbm8uY29tMSQwIgYJ\nKoZIhvcNAQkBFhVzdXBwb3J0QG1hZXN0cmFuby5jb20wHhcNMTQwMTA0MDUyMjM5\nWhcNMzMxMjMwMDUyMjM5WjCBhjELMAkGA1UEBhMCQVUxDDAKBgNVBAgTA05TVzEP\nMA0GA1UEBxMGU3lkbmV5MRowGAYDVQQKExFNYWVzdHJhbm8gUHR5IEx0ZDEWMBQG\nA1UEAxMNbWFlc3RyYW5vLmNvbTEkMCIGCSqGSIb3DQEJARYVc3VwcG9ydEBtYWVz\ndHJhbm8uY29tMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDVkIqo5t5Paflu\nP2zbSbzxn29n6HxKnTcsubycLBEs0jkTkdG7seF1LPqnXl8jFM9NGPiBFkiaR15I\n5w482IW6mC7s8T2CbZEL3qqQEAzztEPnxQg0twswyIZWNyuHYzf9fw0AnohBhGu2\n28EZWaezzT2F333FOVGSsTn1+u6tFwIDAQABo4HuMIHrMB0GA1UdDgQWBBSvrNxo\neHDm9nhKnkdpe0lZjYD1GzCBuwYDVR0jBIGzMIGwgBSvrNxoeHDm9nhKnkdpe0lZ\njYD1G6GBjKSBiTCBhjELMAkGA1UEBhMCQVUxDDAKBgNVBAgTA05TVzEPMA0GA1UE\nBxMGU3lkbmV5MRowGAYDVQQKExFNYWVzdHJhbm8gUHR5IEx0ZDEWMBQGA1UEAxMN\nbWFlc3RyYW5vLmNvbTEkMCIGCSqGSIb3DQEJARYVc3VwcG9ydEBtYWVzdHJhbm8u\nY29tggkA56EGv5giuGMwDAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQUFAAOBgQCc\nMPgV0CpumKRMulOeZwdpnyLQI/NTr3VVHhDDxxCzcB0zlZ2xyDACGnIG2cQJJxfc\n2GcsFnb0BMw48K6TEhAaV92Q7bt1/TYRvprvhxUNMX2N8PHaYELFG2nWfQ4vqxES\nRkjkjqy+H7vir/MOF3rlFjiv5twAbDKYHXDT7v1YCg==\n-----END CERTIFICATE-----"
)
Maestrano::Configuration::EVT_CONFIG['production']['api.host'] = 'http://localhost:3000'

Maestrano.configure do |config|
  
  # ==> Environment configuration
  # The environment to connect to.
  # If set to 'production' then all Single Sign-On (SSO) and API requests
  # will be made to maestrano.com
  # If set to 'test' then requests will be made to api-sandbox.maestrano.io
  # The api-sandbox allows you to easily test integration scenarios.
  # More details on http://api-sandbox.maestrano.io
  #
  config.environment = (Rails.env.production? ? 'production' : 'test')
  
  # ==> Application host
  # This is your application host (e.g: my-app.com) which is ultimately
  # used to redirect users to the right SAML url during SSO handshake.
  #
  config.app.host = (config.environment == 'production' ? 'http://mno-rails-demoapp.herokuapp.com' : 'http://localhost:7000')
  
  # ==> App ID & API key
  # Your application App ID and API key which you can retrieve on http://maestrano.com
  # via your cloud partner dashboard.
  # For testing you can retrieve/generate an api.id and api.key from the API Sandbox directly 
  # on http://api-sandbox.maestrano.io
  #
  config.api.id = (config.environment == 'production' ? 'app-15u8' : 'app-1')
  config.api.key = (config.environment == 'production' ? '3744ce0613cfb202b491b659a3477ec3a30549cca54498862cd45ccbb7c16afa' : 'gfcmbu8269wyi0hjazk4t7o1sndpvrqxl53e1')
  
  # ==> Single Sign-On activation
  # Enable/Disable single sign-on. When troubleshooting authentication issues
  # you might want to disable SSO temporarily
  #
  # config.sso.enabled = true
  
  # ==> Single Sign-On Identity Manager
  # By default we consider that the domain managing user identification
  # is the same as your application host (see above config.app.host parameter)
  # If you have a dedicated domain managing user identification and therefore
  # responsible for the single sign-on handshake (e.g: https://idp.my-app.com)
  # then you can specify it below
  #
  # config.sso.idm = (config.environment == 'production' ? 'https://idp.my-app.com' : 'http://localhost:3000')
  
  # ==> SSO Initialization endpoint
  # This is your application path to the SAML endpoint that allows users to
  # initialize SSO authentication. Upon reaching this endpoint users your
  # application will automatically create a SAML request and redirect the user
  # to Maestrano. Maestrano will then authenticate and authorize the user. Upon
  # authorization the user gets redirected to your application consumer endpoint
  # (see below) for initial setup and/or login.
  #
  # The controller for this path is automatically
  # generated when you run 'rake maestrano:install' and is available at
  # <rails_root>/app/controllers/maestrano/auth/saml.rb
  #
  # config.sso.init_path = '/maestrano/auth/saml/init'
  
  # ==> SSO Consumer endpoint
  # This is your application path to the SAML endpoint that allows users to
  # finalize SSO authentication. During the 'consume' action your application
  # sets users (and associated group) up and/or log them in.
  #
  # The controller for this path is automatically
  # generated when you run 'rake maestrano:install' and is available at
  # <rails_root>/app/controllers/maestrano/auth/saml.rb
  #
  # config.sso.consume_path = '/maestrano/auth/saml/consume'
  
  # ==> Single Logout activation
  # Enable/Disable single logout. When troubleshooting authentication issues
  # you might want to disable SLO temporarily.
  # If set to false then Maestrano::SSO::Session#valid? - which should be
  # used in a controller before filter to check user session - always return true
  #
  # config.sso.slo_enabled = true
  
  # ==> SSO User creation mode
  # !IMPORTANT
  # On Maestrano users can take several "instances" of your service. You can consider
  # each "instance" as 1) a billing entity and 2) a collaboration group (this is
  # equivalent to a 'customer account' in a commercial world). When users login to
  # your application via single sign-on they actually login via a specific group which
  # is then supposed to determine which data they have access to inside your application.
  #
  # E.g: John and Jack are part of group 1. They should see the same data when they login to
  # your application (employee info, analytics, sales etc..). John is also part of group 2 
  # but not Jack. Therefore only John should be able to see the data belonging to group 2.
  #
  # In most application this is done via collaboration/sharing/permission groups which is
  # why a group is required to be created when a new user logs in via a new group (and 
  # also for billing purpose - you charge a group, not a user directly). 
  #
  # == mode: 'real'
  # In an ideal world a user should be able to belong to several groups in your application.
  # In this case you would set the 'sso.creation_mode' to 'real' which means that the uid
  # and email we pass to you are the actual user email and maestrano universal id.
  #
  # == mode: 'virtual'
  # Now let's say that due to technical constraints your application cannot authorize a user
  # to belong to several groups. Well next time John logs in via a different group there will
  # be a problem: the user already exists (based on uid or email) and cannot be assigned 
  # to a second group. To fix this you can set the 'sso.creation_mode' to 'virtual'. In this
  # mode users get assigned a truly unique uid and email across groups. So next time John logs
  # in a whole new user account can be created for him without any validation problem. In this
  # mode the email we assign to him looks like "usr-sdf54.cld-45aa2@mail.maestrano.com". But don't
  # worry we take care of forwarding any email you would send to this address
  #
  # config.sso.creation_mode = 'real' # or 'virtual'
  
  # ==> Account Webhooks
  # Single sign on has been setup into your app and Maestrano users are now able
  # to use your service. Great! Wait what happens when a business (group) decides to 
  # stop using your service? Also what happens when a user gets removed from a business?
  # Well the endpoints below are for Maestrano to be able to notify you of such
  # events.
  #
  # Even if the routes look restful we issue only issue DELETE requests for the moment
  # to notify you of any service cancellation (group deletion) or any user being
  # removed from a group.
  #
  # The controllers for these hooks path are automatically generated when 
  # you run 'rake maestrano:install' and is available under
  # <rails_root>/app/controllers/maestrano/account/
  #
  # config.webhook.account.groups_path = '/maestrano/account/groups/:id',
  # config.webhook.account.group_users_path = '/maestrano/account/groups/:group_id/users/:id',
end