package util

import (
	"math/rand"
	"strings"
)

var alphabet string = "abcdefghijklmnopqrstuvwxyz"

func RandomInt(max, min int64) int64 {
	return min + rand.Int63n(max-min+1)
}

func RandomString(generatedStringSize int) string {
	var sub strings.Builder
	k := len(alphabet)

	for i := 0; i < generatedStringSize; i++ {
		c := alphabet[rand.Intn(k)]
		sub.WriteByte(c)
	}
	return sub.String()
}

func RandomUserName() string {
	return RandomString(5)
}
