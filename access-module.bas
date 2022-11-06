Option Compare Database

Private Const URL = "https://whatsapp.davar.biz/send-message"


Private Sub send_whatsapp()

    Dim objHTTP As New MSXML2.XMLHTTP60
    Dim json As String
    Dim body As Dictionary
    
    Set body = New Dictionary
    
    body.Add "phone", "972527695300"
    body.Add "caption", "This is the file"
    body.Add "file", "C:\\Users\\MusiCode1\\AppData\\Local\\Packages\\5319275A.51895FA4EA97F_cv1g1gvanyjgm\\LocalState\\shared\\transfers\\2022_19\\3aa19123a50ae2ea25deca8f71ac9eab043a25eb.jpg"
    
    json = JsonConverter.ConvertToJson(body)
    
    Set body = Nothing

    Set objHTTP = New MSXML2.ServerXMLHTTP60

    objHTTP.Open "POST", URL, False

    objHTTP.setRequestHeader "Content-type", "application/json"
    objHTTP.send (json)
    Debug.Print objHTTP.responseText
   
    If objHTTP.Status <> 200 Then
    
     
    End If
    
    Set objHTTP = Nothing
   

End Sub
