<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Reset your password</title></head>
<body style="margin:0;background:#07111d;color:#e2e8f0;font-family:Arial,sans-serif;padding:32px 16px">
    <table role="presentation" style="width:100%;max-width:560px;margin:auto;border:1px solid #226078;background:#0b1b2c">
        <tr><td style="padding:32px">
            <p style="color:#67e8f9;font-size:12px;letter-spacing:3px">DRAGONA DOMINION</p>
            <h1 style="font-family:Georgia,serif;color:#ffffff;font-size:28px">Reclaim your account</h1>
            <p>Hello {{ $name }},</p>
            <p style="line-height:1.7">We received a request to reset your password. Choose a new one to return to the realm.</p>
            <p style="margin:28px 0"><a href="{{ $url }}" style="display:inline-block;background:#155e75;border:1px solid #67e8f9;color:#ffffff;padding:16px 24px;text-decoration:none;font-weight:bold">Reset password</a></p>
            <p style="line-height:1.7">This link expires in {{ $minutes }} minutes and can only be used once. If you did not request this, you can ignore this email.</p>
            <p style="font-size:12px;color:#94a3b8;line-height:1.7">If the button does not work, copy this link into your browser:</p>
            <p style="word-break:break-all;font-size:12px"><a href="{{ $url }}" style="color:#67e8f9">{{ $url }}</a></p>
        </td></tr>
    </table>
</body>
</html>

