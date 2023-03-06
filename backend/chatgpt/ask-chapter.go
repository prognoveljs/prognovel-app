package chatgpt

import (
	"context"
	"net/http"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase/core"
	"github.com/sashabaranov/go-openai"
)

var ask_prefix string = `
Bot will only answer anything related to novel books based on user's input.
It will apologize politely if it doesn't recognize the books user is talking about:
`

func AskGPT(e *core.ServeEvent) error {
	// add new "GET /api/hello" route to the app router (echo)
	e.Router.AddRoute(echo.Route{
		Method: http.MethodPost,
		Path:   "/api/ask-chatgpt",
		Handler: func(c echo.Context) error {
			message := c.FormValue("message")

			req := openai.ChatCompletionRequest{
				Model:     openai.GPT3Dot5Turbo,
				MaxTokens: 256,
				Messages: []openai.ChatCompletionMessage{
					{
						Role:    openai.ChatMessageRoleUser,
						Content: ask_prefix + "\n" + message,
					},
				},
				Stream: false,
			}

			ctx := context.Background()

			response, err := OpenAIClient.CreateChatCompletion(ctx, req)

			if err != nil {
				return c.String(http.StatusBadRequest, err.Error())
			}

			return c.JSON(200, response)
		},
		Middlewares: []echo.MiddlewareFunc{
			// apis.RequireAdminOrOwnerAuth("user-id"),
		},
	})

	return nil
}
