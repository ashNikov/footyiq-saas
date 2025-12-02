terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

locals {
  project_name = "footyiq"
}

# -----------------------------
# IAM ROLE FOR LAMBDA EXECUTION
# -----------------------------

resource "aws_iam_role" "lambda_exec" {
  name = "${local.project_name}-${var.environment}-lambda-exec"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com"
        },
        Action = "sts:AssumeRole"
      }
    ]
  })
}

# Basic logging permissions so Lambda can write to CloudWatch Logs
resource "aws_iam_role_policy" "lambda_logging" {
  name = "${local.project_name}-${var.environment}-lambda-logging"
  role = aws_iam_role.lambda_exec.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Resource = "*"
      }
    ]
  })
}

# ---------------------------------
# LAMBDA FUNCTION: Prediction Engine
# ---------------------------------

resource "aws_lambda_function" "prediction" {
  function_name = "${local.project_name}-${var.environment}-prediction"
  role          = aws_iam_role.lambda_exec.arn
  handler       = "handlers/getPrediction.handler"
  runtime       = "nodejs20.x"

  # Zip we built in backend
  filename         = "${path.module}/../../backend/prediction.zip"
  source_code_hash = filebase64sha256("${path.module}/../../backend/prediction.zip")

  environment {
    variables = {
      NODE_ENV     = var.environment
      PROJECT_NAME = local.project_name
    }
  }
}

