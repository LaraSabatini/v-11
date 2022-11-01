const transformHTML = (
  till: { cash: string; mp: string },
  earningsStore: { cash: string; mp: string },
  earningsBoulder: { cash: string; mp: string },
  user: string,
  amountOfPeople: number,
  freePass: number,
  month: number,
  lessons: number,
) => {
  const HTML = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns=http://www.w3.org/1999/xhtml xmlns:v=urn:schemas-microsoft-com:vml xmlns:o=urn:schemas-microsoft-com:office:office lang="es">
  <head>
  <title>Cierre de caja</title>
  <meta name=x-apple-disable-message-reformatting>
  <meta http-equiv=X-UA-Compatible>
  <meta charset=utf-8>
  <meta name=viewport content=target-densitydpi=device-dpi>
  <meta content=true name=HandheldFriendly>
  <meta content=width=device-width name=viewport>
  <style type="text/css">
  table {
  border-collapse: separate;
  table-layout: fixed;
  mso-table-lspace: 0pt;
  mso-table-rspace: 0pt
  }
  table td {
  border-collapse: collapse
  }
  .ExternalClass {
  width: 100%
  }
  .ExternalClass,
  .ExternalClass p,
  .ExternalClass span,
  .ExternalClass font,
  .ExternalClass td,
  .ExternalClass div {
  line-height: 100%
  }
  * {
  line-height: inherit;
  text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -o-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale
  }
  html {
  -webkit-text-size-adjust: none !important
  }
  img+div {
  display: none;
  display: none !important
  }
  img {
  Margin: 0;
  padding: 0;
  -ms-interpolation-mode: bicubic
  }
  h1, h2, h3, p, a {
  font-family: inherit;
  font-weight: inherit;
  font-size: inherit;
  line-height: 1;
  color: inherit;
  background: none;
  overflow-wrap: normal;
  white-space: normal;
  word-break: break-word
  }
  a {
  color: inherit;
  text-decoration: none
  }
  h1, h2, h3, p {
  min-width: 100%!important;
  width: 100%!important;
  max-width: 100%!important;
  display: inline-block!important;
  border: 0;
  padding: 0;
  margin: 0
  }
  a[x-apple-data-detectors] {
  color: inherit !important;
  text-decoration: none !important;
  font-size: inherit !important;
  font-family: inherit !important;
  font-weight: inherit !important;
  line-height: inherit !important
  }
  a[href^="mailto"],
  a[href^="tel"],
  a[href^="sms"] {
  color: inherit !important;
  text-decoration: none !important
  }
  @media only screen and (min-width: 481px) {
  .hd { display: none!important }
  }
  @media only screen and (max-width: 480px) {
  .hm { display: none!important }
  }
  [style*="Josefin Sans"] {font-family: 'Josefin Sans', BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif !important;} [style*="Inter Tight"] {font-family: 'Inter Tight', BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif !important;} [style*="Albert Sans"] {font-family: 'Albert Sans', BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif !important;}
  @media only screen and (min-width: 481px) {.t11,.t9{border-radius:20px!important}.t45{width:800px!important}.t58,.t60{border-radius:12px!important}.t64,.t69{padding-right:unset!important}.t76{width:68.73449%!important;max-width:277px!important}.t80{font-size:16px!important}.t86{width:31.26551%!important;max-width:126px!important}.t90{font-size:16px!important}.t94,.t99{padding-right:unset!important}.t106{width:68.73449%!important;max-width:277px!important}.t110{font-size:16px!important}.t116{width:31.26551%!important;max-width:126px!important}.t120{font-size:16px!important}.t124,.t129{padding-right:unset!important}.t136{width:68.73449%!important;max-width:277px!important}.t140{font-size:16px!important}.t146{width:31.26551%!important;max-width:126px!important}.t150{font-size:16px!important}.t157,.t159{border-radius:12px!important}.t163,.t168{padding-right:unset!important}.t175{width:68.73449%!important;max-width:277px!important}.t179{font-size:16px!important}.t185{width:31.26551%!important;max-width:126px!important}.t189{font-size:16px!important}.t193,.t198{padding-right:unset!important}.t205{width:68.73449%!important;max-width:277px!important}.t209{font-size:16px!important}.t215{width:31.26551%!important;max-width:126px!important}.t219{font-size:16px!important}.t242{border-radius:12px!important}.t244{width:33.33333%!important;max-width:245px!important}.t247,.t281{border-radius:12px!important}.t283{width:33.33333%!important;max-width:245px!important}.t286,.t320{border-radius:12px!important}.t322{width:33.33333%!important;max-width:245px!important}.t325,.t378{border-radius:12px!important}.t380{max-width:182px!important}.t383{border-radius:12px!important}}
  </style>
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400&family=Inter+Tight:wght@500;600&family=Albert+Sans:wght@400&display=swap" rel="stylesheet" type="text/css">
  <!--<![endif]-->
  <!--[if mso]>
  <style type="text/css">
  .t11,.t9{border-radius:20px !important}.t45{width:800px !important}.t58,.t60{border-radius:12px !important}.t64,.t69{padding-right:unset !important}.t76{width:68.73449% !important;max-width:277px !important}.t80{font-size:16px !important}.t86{width:31.26551% !important;max-width:126px !important}.t90{font-size:16px !important}.t94,.t99{padding-right:unset !important}.t106{width:68.73449% !important;max-width:277px !important}.t110{font-size:16px !important}.t116{width:31.26551% !important;max-width:126px !important}.t120{font-size:16px !important}.t124,.t129{padding-right:unset !important}.t136{width:68.73449% !important;max-width:277px !important}.t140{font-size:16px !important}.t146{width:31.26551% !important;max-width:126px !important}.t150{font-size:16px !important}.t157,.t159{border-radius:12px !important}.t163,.t168{padding-right:unset !important}.t175{width:68.73449% !important;max-width:277px !important}.t179{font-size:16px !important}.t185{width:31.26551% !important;max-width:126px !important}.t189{font-size:16px !important}.t193,.t198{padding-right:unset !important}.t205{width:68.73449% !important;max-width:277px !important}.t209{font-size:16px !important}.t215{width:31.26551% !important;max-width:126px !important}.t219{font-size:16px !important}.t242{border-radius:12px !important}.t244{width:33.33333% !important;max-width:245px !important}.t247,.t281{border-radius:12px !important}.t283{width:33.33333% !important;max-width:245px !important}.t286,.t320{border-radius:12px !important}.t322{width:33.33333% !important;max-width:245px !important}.t325,.t378{border-radius:12px !important}.t380{max-width:182px !important}.t383{border-radius:12px !important}
  </style>
  <![endif]-->
  <script type="application/ld+json">[{"@context":"http://schema.org/","@type":"Organization","logo":"https://uploads.tabular.email/u/3d977bfc-e240-4fb1-ae61-409ac407b092/dcbdc0cc-47ab-4526-993d-461d2a5a7354.png"}]</script>
  <!--[if mso]>
  <xml>
  <o:OfficeDocumentSettings>
  <o:AllowPNG/>
  <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  </head>
  <body class=t0 style="min-width:100%;Margin:0px;padding:0px;background-color:#532D75;">
  <div style="display:none; font-size:1px; color:#333333; line-height:1px; max-height:0px; max-width:0px; opacity:0; overflow:hidden;">Cierre de caja</div><div style="font-size: 0px; line-height:0px; display: none; max-height: 0px; overflow: hidden;">&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</div><div class=t1 style="background-color:#532D75;"><table role=presentation width=100% cellpadding=0 cellspacing=0 border=0 align=center><tr><td class=t433 style="font-size:0;line-height:0;mso-line-height-rule:exactly;" valign=top align=center>
  <!--[if mso]>
  <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
  <v:fill color=#532D75 />
  </v:background>
  <![endif]-->
  <table role=presentation width=100% cellpadding=0 cellspacing=0 border=0 align=center><tr><td><div class=t3 style="mso-line-height-rule:exactly;mso-line-height-alt:88px;line-height:88px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t10 role=presentation cellpadding=0 cellspacing=0 align=center><tr>
  <!--[if !mso]><!--><td class=t11 style="background-color:#FFFFFF;width:540px;padding:41px 30px 50px 30px;">
  <!--<![endif]-->
  <!--[if mso]><td style="background-color:#FFFFFF;width:600px;padding:41px 30px 50px 30px;"><![endif]-->
  <table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t14 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t15 style="width:600px;"><p class=t21 style="text-decoration:none;text-transform:none;direction:ltr;color:#111111;text-align:left;mso-line-height-rule:exactly;font:normal 400 24px/24px BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Josefin Sans';">Cierre de Caja - dd/mm/yyyy</p></td>
  </tr></table>
  </td></tr><tr><td><div class=t13 style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td><div class=t42 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t44 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t45 style="width:322px;"><div class=t51 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td class=t54 style="width:5px;" width=5></td><td width=260 valign=top><![endif]-->
  <div class=t55 style="display:inline-table;text-align:initial;vertical-align:inherit;width:50%;max-width:274px;"><div class=t56 style="padding:0 5px 0 5px;"><div class=t52 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div>
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t57><tr>
  <td class=t58 style="background-color:#F6F6F6;padding:20px 20px 20px 20px;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t63 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t64 style="width:800px;"><div class=t70 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=151.21588 valign=top><![endif]-->
  <div class=t76 style="display:inline-table;text-align:initial;vertical-align:inherit;width:47.46137%;max-width:215px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t78><tr>
  <td class=t79><p class=t80 style="text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;font:normal 600 14px/22px BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';">FT</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td><td width=68.78412 valign=top><![endif]-->
  <div class=t86 style="display:inline-table;text-align:initial;vertical-align:inherit;width:52.53863%;max-width:238px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t88><tr>
  <td class=t89><p class=t90 style="text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;font:normal 500 14px/22px BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';">$ ${
    till.cash
  }</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td>
  </tr></table>
  <![endif]-->
  </div></td>
  </tr></table>
  </td></tr><tr><td><div class=t91 style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t93 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t94 style="width:800px;"><div class=t100 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=151.21588 valign=top><![endif]-->
  <div class=t106 style="display:inline-table;text-align:initial;vertical-align:inherit;width:47.42647%;max-width:129px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t108><tr>
  <td class=t109><p class=t110 style="text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;font:normal 600 14px/22px BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';">MP</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td><td width=68.78412 valign=top><![endif]-->
  <div class=t116 style="display:inline-table;text-align:initial;vertical-align:inherit;width:52.57353%;max-width:143px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t118><tr>
  <td class=t119><p class=t120 style="text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;font:normal 500 14px/22px BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';">$ ${
    till.mp
  }</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td>
  </tr></table>
  <![endif]-->
  </div></td>
  </tr></table>
  </td></tr><tr><td><div class=t121 style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t123 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t124 style="width:800px;"><div class=t130 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=151.21588 valign=top><![endif]-->
  <div class=t136 style="display:inline-table;text-align:initial;vertical-align:inherit;width:47.42647%;max-width:129px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t138><tr>
  <td class=t139><p class=t140 style="text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;font:normal 600 14px/22px BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';">Total</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td><td width=68.78412 valign=top><![endif]-->
  <div class=t146 style="display:inline-table;text-align:initial;vertical-align:inherit;width:52.57353%;max-width:143px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t148><tr>
  <td class=t149><p class=t150 style="text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;font:normal 500 14px/22px BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';">$ ${
    till.cash + till.mp
  }</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td>
  </tr></table>
  <![endif]-->
  </div></td>
  </tr></table>
  </td></tr></table></td>
  </tr></table>
  <div class=t53 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></div></div>
  <!--[if mso]>
  </td><td class=t54 style="width:5px;" width=5></td><td class=t153 style="width:5px;" width=5></td><td width=260 valign=top><![endif]-->
  <div class=t154 style="display:inline-table;text-align:initial;vertical-align:inherit;width:50%;max-width:274px;"><div class=t155 style="padding:0 5px 0 5px;"><div class=t151 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div>
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t156><tr>
  <td class=t157 style="background-color:#F6F6F6;padding:20px 20px 20px 20px;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t162 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t163 style="width:800px;"><div class=t169 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=151.21588 valign=top><![endif]-->
  <div class=t175 style="display:inline-table;text-align:initial;vertical-align:inherit;width:58.88594%;max-width:222px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t177><tr>
  <td class=t178><p class=t179 style="text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;font:normal 600 14px/22px BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';">Prod.</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td><td width=68.78412 valign=top><![endif]-->
  <div class=t185 style="display:inline-table;text-align:initial;vertical-align:inherit;width:41.11406%;max-width:155px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t187><tr>
  <td class=t188><p class=t189 style="text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;font:normal 500 14px/22px BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';">$ ${
    earningsStore.cash
  } | $ ${earningsStore.mp}</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td>
  </tr></table>
  <![endif]-->
  </div></td>
  </tr></table>
  </td></tr><tr><td><div class=t190 style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t192 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t193 style="width:800px;"><div class=t199 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=151.21588 valign=top><![endif]-->
  <div class=t205 style="display:inline-table;text-align:initial;vertical-align:inherit;width:58.88594%;max-width:222px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t207><tr>
  <td class=t208><p class=t209 style="text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;font:normal 600 14px/22px BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';">Boulder</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td><td width=68.78412 valign=top><![endif]-->
  <div class=t215 style="display:inline-table;text-align:initial;vertical-align:inherit;width:41.11406%;max-width:155px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t217><tr>
  <td class=t218><p class=t219 style="text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;font:normal 500 14px/22px BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';">$ ${
    earningsBoulder.cash
  } | $ ${earningsBoulder.mp}</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td>
  </tr></table>
  <![endif]-->
  </div></td>
  </tr></table>
  </td></tr></table></td>
  </tr></table>
  <div class=t152 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></div></div>
  <!--[if mso]>
  </td><td class=t153 style="width:5px;" width=5></td>
  </tr></table>
  <![endif]-->
  </div></td>
  </tr></table>
  </td></tr><tr><td><div class=t220 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t227 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t228 style="width:800px;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t231 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t232 style="width:610px;"><div class=t238 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td class=t243 style="width:5px;" width=5></td><td width=170 valign=top><![endif]-->
  <div class=t244 style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:388px;"><div class=t245 style="padding:0 5px 0 5px;"><div class=t239 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div>
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t246><tr>
  <td class=t247 style="background-color:#F6F6F6;padding:30px 40px 30px 40px;"><div class=t248 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=90 valign=top><![endif]-->
  <div class=t252 style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:800px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t254><tr>
  <td class=t255><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t260 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t261 style="width:600px;"><p class=t267 style="text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;font:normal 600 16px/22px BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';">Asistencias</p></td>
  </tr></table>
  </td></tr><tr><td><div class=t268 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t270 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t271 style="width:600px;"><p class=t277 style="text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;font:normal 500 16px/22px BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';">${amountOfPeople}</p></td>
  </tr></table>
  </td></tr></table></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td>
  </tr></table>
  <![endif]-->
  </div></td>
  </tr></table>
  <div class=t240 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></div></div>
  <!--[if mso]>
  </td><td class=t243 style="width:5px;" width=5></td><td class=t282 style="width:5px;" width=5></td><td width=170 valign=top><![endif]-->
  <div class=t283 style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:415px;"><div class=t284 style="padding:0 5px 0 5px;"><div class=t278 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div>
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t285><tr>
  <td class=t286 style="background-color:#F6F6F6;padding:30px 40px 30px 40px;"><div class=t287 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=90 valign=top><![endif]-->
  <div class=t291 style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:800px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t293><tr>
  <td class=t294><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t299 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t300 style="width:600px;"><p class=t306 style="text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;font:normal 600 16px/22px BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';">Pase diario</p></td>
  </tr></table>
  </td></tr><tr><td><div class=t307 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t309 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t310 style="width:600px;"><p class=t316 style="text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;font:normal 500 16px/22px BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';">${freePass}</p></td>
  </tr></table>
  </td></tr></table></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td>
  </tr></table>
  <![endif]-->
  </div></td>
  </tr></table>
  <div class=t279 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></div></div>
  <!--[if mso]>
  </td><td class=t282 style="width:5px;" width=5></td><td class=t321 style="width:5px;" width=5></td><td width=170 valign=top><![endif]-->
  <div class=t322 style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:448px;"><div class=t323 style="padding:0 5px 0 5px;"><div class=t317 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div>
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t324><tr>
  <td class=t325 style="background-color:#F6F6F6;padding:30px 40px 30px 40px;"><div class=t326 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=90 valign=top><![endif]-->
  <div class=t330 style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:800px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t332><tr>
  <td class=t333><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t338 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t339 style="width:600px;"><p class=t345 style="text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;font:normal 600 16px/22px BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';">Mensual</p></td>
  </tr></table>
  </td></tr><tr><td><div class=t346 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t348 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t349 style="width:600px;"><p class=t355 style="text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;font:normal 500 16px/22px BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';">${month}</p></td>
  </tr></table>
  </td></tr></table></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td>
  </tr></table>
  <![endif]-->
  </div></td>
  </tr></table>
  <div class=t318 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></div></div>
  <!--[if mso]>
  </td><td class=t321 style="width:5px;" width=5></td>
  </tr></table>
  <![endif]-->
  </div></td>
  </tr></table>
  </td></tr></table></td>
  </tr></table>
  </td></tr><tr><td><div class=t356 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t363 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t364 style="width:800px;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t367 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t368 style="width:610px;"><div class=t374 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td class=t379 style="width:5px;" width=5></td><td width=172 valign=top><![endif]-->
  <div class=t380 style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:388px;"><div class=t381 style="padding:0 5px 0 5px;"><div class=t375 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div>
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t382><tr>
  <td class=t383 style="background-color:#F6F6F6;padding:30px 40px 30px 40px;"><div class=t384 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=92 valign=top><![endif]-->
  <div class=t388 style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:800px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t390><tr>
  <td class=t391><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t396 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t397 style="width:600px;"><p class=t403 style="text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;font:normal 600 16px/22px BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';">Clases</p></td>
  </tr></table>
  </td></tr><tr><td><div class=t404 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t406 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t407 style="width:600px;"><p class=t413 style="text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;font:normal 500 16px/22px BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';">${lessons}</p></td>
  </tr></table>
  </td></tr></table></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td>
  </tr></table>
  <![endif]-->
  </div></td>
  </tr></table>
  <div class=t376 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></div></div>
  <!--[if mso]>
  </td><td class=t379 style="width:5px;" width=5></td>
  </tr></table>
  <![endif]-->
  </div></td>
  </tr></table>
  </td></tr></table></td>
  </tr></table>
  </td></tr><tr><td><div class=t414 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t421 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t422 style="width:800px;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  </tr></table>
  </td></tr></table></td>
  </tr></table>
  </td></tr><tr><td><div class=t32 style="mso-line-height-rule:exactly;mso-line-height-alt:15px;line-height:15px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  </tr></table>
  </td></tr><tr><td><div class=t22 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t24 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t25 style="width:600px;"><p class=t31 style="text-decoration:none;text-transform:none;direction:ltr;color:#111111;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;font:normal 400 14px/24px BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Josefin Sans';">La caja fue cerrada por @${user} a las 00:00 hs</p></td>
  </tr></table>
  </td></tr></table></td>
  </tr></table>
  </td></tr></table></td></tr></table></div></body>
  </html>`

  return HTML
}

export default transformHTML
