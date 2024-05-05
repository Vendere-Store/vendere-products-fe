{{/* Define a template to generate a unique name for resources */}}
{{- define "vendere-products-fe.fullname" -}}
{{- printf "%s-%s" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
