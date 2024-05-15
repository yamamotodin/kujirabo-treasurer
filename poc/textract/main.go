package main

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/textract"
	"github.com/aws/aws-sdk-go-v2/service/textract/types"
	"time"
)

func main() {
	cfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithRegion("ap-northeast-2"),
	)
	if err != nil {
		fmt.Println("Configuration error", err)
		return
	}
	client := textract.NewFromConfig(cfg)

	bucket := "test-textract-kujirabo-apne2"
	key := "recept02.png"

	startDocTextDetectionInput := &textract.StartDocumentTextDetectionInput{
		DocumentLocation: &types.DocumentLocation{
			S3Object: &types.S3Object{
				Bucket: &bucket,
				Name:   &key,
			},
		},
		//FeatureTypes: []textract.FeatureType{textract.FeatureTypeTables},
	}
	startResponse, err := client.StartDocumentTextDetection(context.TODO(), startDocTextDetectionInput)
	if err != nil {
		fmt.Println("Error starting text detection", err)
		return
	}
	jobId := startResponse.JobId
	fmt.Println("Job ID:", jobId)

	// ジョブの完了を待機する処理
LOOP:
	for {
		output, err := client.GetDocumentTextDetection(context.TODO(), &textract.GetDocumentTextDetectionInput{
			JobId: jobId,
		})
		if err != nil {
			fmt.Println("Error getting text detection results", err)
			return
		}
		fmt.Println(output.JobStatus)
		switch output.JobStatus {
		case types.JobStatusFailed:
			fmt.Println("Error describing text detection job", err)
			break LOOP
		case types.JobStatusInProgress:
			fmt.Println("continue..")
			time.Sleep(5 * time.Second)
			continue LOOP
		case types.JobStatusSucceeded:
		case types.JobStatusPartialSuccess:
		}
		fmt.Println("textract:")
		b, err := json.Marshal(output)
		if err != nil {
			fmt.Println(err)
			return
		}
		fmt.Println(string(b))
		break
		//describeResponse, err := client.(context.TODO(), &types.DescribeDocumentTextDetectionInput{
		//	JobId: jobId,
		//})
		//if err != nil {
		//	fmt.Println("Error describing text detection job", err)
		//	return
		//}
		//if describeResponse.JobStatus == textract.JobStatusSucceeded {
		//	break
		//}
	}
}
