variable "app_domain" {
  description = "The domain prefix for the bucket name, which comes after either `s3-asset-path`"
  type = "string"
  default = "billybonks.io"
}

variable "name" {
  type = "string"
  default = "app"
}

locals {
  env_suffix = "${terraform.workspace == "production" ? "" : join("", list("-", terraform.workspace))}"
  name = "${var.name}${local.env_suffix}"
}
