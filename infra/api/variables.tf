variable "aws_region" {
  description = "AWS region to deploy FootyIQ API"
  type        = string
  default     = "eu-west-1" # change if you prefer another region
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "dev"
}

