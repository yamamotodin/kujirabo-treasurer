package main

import (
	"context"
	"fmt"
	"time"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/textract"
)

func main() {
	cfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithRegion("ap-northeast-1"),
	)
	if err != nil {
		fmt.Println("Configuration error", err)
		return
	}
	client := textract.NewFromConfig(cfg)

	startDocTextDetectionInput := &textract.StartDocumentTextDetectionInput{
		DocumentLocation: &textract.DocumentLocation{
			S3Object: &textract.S3Object{
				Bucket: &bucket,
				Name:   &documentName,
			},
		},
		FeatureTypes: []textract.FeatureType{textract.FeatureTypeTables},
	}
	startResponse, err := client.StartDocumentTextDetection(context.TODO(), startDocTextDetectionInput)
	if err != nil {
		fmt.Println("Error starting text detection", err)
		return
	}
	jobId := startResponse.JobId
	fmt.Println("Job ID:", jobId)

	// ジョブの完了を待機する処理

	for {
		describeResponse, err := client.DescribeDocumentTextDetection(context.TODO(), &textract.DescribeDocumentTextDetectionInput{
			JobId: jobId,
		})
		if err != nil {
			fmt.Println("Error describing text detection job", err)
			return
		}
		if describeResponse.JobStatus == textract.JobStatusSucceeded {
			break
		}
		// 5秒待機
		time.Sleep(5 * time.Second)
	}

	getResponse, err := client.GetDocumentTextDetection(context.TODO(), &textract.GetDocumentTextDetectionInput{
		JobId: jobId,
	})
	if err != nil {
		fmt.Println("Error getting text detection results", err)
		return
	}
	// 結果の処理
}
