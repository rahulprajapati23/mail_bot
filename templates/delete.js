// module.exports = (data) => {
//   return`
//   <!DOCTYPE html>
//   <html>
//   <body style="margin:0; padding:0; background:#ffffff; font-family:Arial, sans-serif;">

//   <table width="100%" style="max-width:600px; margin:auto;">
//       <tr>
//       <td align="center" style="padding:20px;">
//         <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
//              width="120" style="display:block;">
//       </td>
//     </tr>
//     <tr>
//       <td style="padding:20px 0;">
//         <h2>Your Instagram account is scheduled for deletion</h2>
//       </td>
//     </tr>

//     <tr>
//       <td style="font-size:14px;">
//         <p>Hi <strong>${data.username}</strong>,</p>

//         <p>
//           We're sorry to see you requested to delete your account.
//           If you change your mind, you have until <strong>May 30, 2026</strong> to let us know.
//           Otherwise, all your posts and information will be deleted.
//         </p>

//         <p> If this was a mistake, or you want to keep your account after all, please let us know.</p>
//       </td>
//     </tr>

//     <tr>
//   <td align="center" style="padding:20px;">
//     <table role="presentation" cellspacing="0" cellpadding="0" border="0">
//       <tr>
//         <td align="center" bgcolor="#2e43e0" style="border-radius:6px;">
//           <a href="https://seclog-jet.vercel.app/"
//              target="_blank"
//              style="font-size:14px; font-family:Arial, sans-serif; color:#ffffff; 
//              text-decoration:none; padding:12px 24px; display:inline-block; font-weight:bold;">
//              Keep Account
//           </a>
//         </td>
//       </tr>
//     </table>
//   </td>
// </tr>

//  <tr>
//       <td style="font-size:12px; color:#666; padding-top:20px; line-height:18px;">
//         <p>This message was sent to ${data.email}.</p>

//         <p>
//           Not your account?
//           <a href="https://seclog-jet.vercel.app/" style="color:#4A5DF9; text-decoration:none;">
//           Remove your email from this account.
//           </a>
//         </p>

//         <p>
//           Meta Platforms, Inc.,<br>
//           Attention: Community Support,<br>
//         1 Meta Way, Menlo Park, CA 94025
//         </p>
//       </td>
//     </tr>

//   </table>

//   </body>
//   </html>
//   `
// };

module.exports = (data) => {
  return {
    subject: "Your Instagram account is scheduled for deletion",
    html: `
        <!DOCTYPE html>
  <html>
  <body style="margin:0; padding:0; background:#ffffff; font-family:Arial, sans-serif;">

  <table width="100%" style="max-width:600px; margin:auto;">
      <tr>
      <td align="center" style="padding:20px;">
        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
             width="120" style="display:block;">
      </td>

    <tr>
      <td style="font-size:14px;">
        <p>Hi <strong>${data.username}</strong>,</p>

        <p>
          We're sorry to see you requested to delete your account.
          If you change your mind, you have until <strong>May 30, 2026</strong> to let us know.
          Otherwise, all your posts and information will be deleted.
        </p>

        <p> If this was a mistake, or you want to keep your account after all, please let us know.</p>
      </td>
    </tr>

    <tr>
  <td align="center" style="padding:20px;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td align="center" bgcolor="#2e43e0" style="border-radius:6px;">
          <a href="https://seclog-jet.vercel.app/"
             target="_blank"
             style="font-size:14px; font-family:Arial, sans-serif; color:#ffffff; 
             text-decoration:none; padding:12px 24px; display:inline-block; font-weight:bold;">
             Keep Account
          </a>
        </td>
      </tr>
    </table>
  </td>
</tr>

 <tr>
      <td style="font-size:12px; color:#666; padding-top:20px; line-height:18px;">
        <p>This message was sent to ${data.email}.</p>

        <p>
          Not your account?
          <a href="https://seclog-jet.vercel.app/" style="color:#4A5DF9; text-decoration:none;">
          Remove your email from this account.
          </a>
        </p>

        <p>
          Meta Platforms, Inc.,<br>
          Attention: Community Support,<br>
        1 Meta Way, Menlo Park, CA 94025
        </p>
      </td>
    </tr>

  </table>

  </body>
  </html>
    `
  };
};