module.exports = (data) => {
  return {
    subject: "Security Alert: New Login Attempt",

    html: `
    <!DOCTYPE html>
    <html>
    <body style="margin:0; padding:0; background:#f4f6f8; font-family:Arial, sans-serif;">

      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">

            <!-- Container -->
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; margin:20px auto; border-radius:8px; overflow:hidden;">

              <!-- Header -->
              <tr>
                <td style="padding:20px; text-align:center; border-bottom:1px solid #eee;">
                  <h2 style="margin:0; color:#333;">Security Alert</h2>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding:20px; color:#333; font-size:14px; line-height:22px;">

                  <p>Hi <strong>${data.username}</strong>,</p>

                  <p>
                    We noticed a new login attempt on your account.
                    If this was you, you can safely ignore this message.
                  </p>

                  <p>
                    If you don’t recognize this activity, we recommend securing your account immediately.
                  </p>

                  <!-- Button -->
                  <div style="text-align:center; margin:25px 0;">
                    <a href="https://www.instagram.com/accounts/password/reset/"
                       style="background:#4A5DF9; color:#ffffff; padding:12px 24px;
                       text-decoration:none; font-weight:bold; border-radius:6px; display:inline-block;">
                       Secure Your Account
                    </a>
                  </div>

                  <!-- Info Box -->
                  <div style="background:#f1f3f5; padding:12px; border-radius:6px;">
                    <p style="margin:0;"><strong>Email:</strong> ${data.email}</p>
                    <p style="margin:0;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
                  </div>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding:15px; font-size:12px; color:#777; border-top:1px solid #eee;">

                  <p style="margin:0;">This message was sent to ${data.email}</p>

                  <p style="margin:5px 0;">
                    If this wasn’t you, please secure your account immediately.
                  </p>

                  <p style="margin:0;">
                    Security Team<br>
                    Your App
                  </p>

                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>

    </body>
    </html>
    `
  };
};