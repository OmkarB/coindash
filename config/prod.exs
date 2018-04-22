use Mix.Config

# In this file, we keep production configuration that
# you'll likely want to automate and keep away from
# your version control system.
#
# You should document the content of this
# file or create a script for recreating it, since it's
# kept out of version control and might be hard to recover
# or recreate for your teammates (or yourself later on).
config :coindash, Coindash.Endpoint,
  secret_key_base: "OpcxA50ZU8ksuCCXPWrDVdni+1oHxeJHNTchOiqUSZj4ztS/cwtyA7gpeazukdm+"

# Configure your database
config :coindash, Coindash.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "coindash_prod",
  pool_size: 15
