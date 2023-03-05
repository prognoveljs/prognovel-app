package chatgpt

import (
	"os"

	_ "github.com/joho/godotenv/autoload"
	openai "github.com/sashabaranov/go-openai"
)

var OpenAIClient openai.Client = *openai.NewClient(os.Getenv("OPENAI_TOKEN"))
