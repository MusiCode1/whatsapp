
Sub UploadThisFileMain()

   If ActiveWorkbook.Saved = False Then
       MsgBox "This workbook contains unsaved changes. Please save first."
       Exit Sub
   End If

   Dim ret
   ret = StartProcessing("File uploading, Please Wait...", "UploadThisFile")

   If (ret = True) Then
       MsgBox "Upload successful!"
    Else
       MsgBox "Upload failed: " & ret
   End If
End Sub

Private Function UploadThisFile()
    Dim bound As String
    bound = "A0AD2346-9849-4EF0-9A93-ACFE17910734"

    Dim url  As String
    url = "https://<YourServer>/index.php?id={" & bound & "}"

    Dim path As String
    path = ThisWorkbook.path & "\" & ThisWorkbook.Name

    sMultipart = pvGetFileAsMultipart(path, bound)

    On Error Resume Next

    Dim r
    r = pvPostMultipart(url, sMultipart, bound)

    If Err.Number <> 0 Then
      UploadThisFile = Err.Description
      Err.Clear
    Else
      UploadThisFile = True
    End If
End Function

'sends multipart/form-data To the URL using WinHttprequest/XMLHTTP
'FormData - binary (VT_UI1 | VT_ARRAY) multipart form data
Private Function pvPostMultipart(url, FormData, Boundary)
  Dim http 'As New MSXML2.XMLHTTP

  'Create XMLHTTP/ServerXMLHTTP/WinHttprequest object
  'You can use any of these three objects.
  'Set http = CreateObject("WinHttp.WinHttprequest.5")
  'Set http = CreateObject("MSXML2.XMLHTTP")
  Set http = CreateObject("MSXML2.ServerXMLHTTP")

  'Open URL As POST request
  http.Open "POST", url, False

  'Set Content-Type header
  http.setRequestHeader "Content-Type", "multipart/form-data; boundary=" + Boundary

  'Send the form data To URL As POST binary request
  http.send FormData

  'Get a result of the script which has received upload
  pvPostMultipart = http.responseText
End Function

Private Function pvGetFileAsMultipart(sFileName As String, Boundary As String) As Byte()
    Dim nFile           As Integer
    Dim sPostData       As String
    '--- read file
    nFile = FreeFile
    Open sFileName For Binary Access Read As nFile
    If LOF(nFile) > 0 Then
        ReDim baBuffer(0 To LOF(nFile) - 1) As Byte
        Get nFile, , baBuffer
        sPostData = StrConv(baBuffer, vbUnicode)
    End If
    Close nFile
    '--- prepare body
    sPostData = "--" & Boundary & vbCrLf & _
        "Content-Disposition: form-data; name=""uploadfile""; filename=""" & Mid$(sFileName, InStrRev(sFileName, "\") + 1) & """" & vbCrLf & _
        "Content-Type: application/octet-stream" & vbCrLf & vbCrLf & _
        sPostData & vbCrLf & _
        "--" & Boundary & "--"
    '--- post
    pvGetFileAsMultipart = pvToByteArray(sPostData)
End Function

Private Function pvToByteArray(sText As String) As Byte()
    pvToByteArray = StrConv(sText, vbFromUnicode)
End Function