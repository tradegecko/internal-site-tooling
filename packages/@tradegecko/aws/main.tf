provider "aws" {
  region = "us-east-1"
}

module "hosting" {
  source = "./hosting"
  app_domain = "${var.app_domain}"
  name   = "${local.name}"
}
