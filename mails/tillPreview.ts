interface TillBodyInterface {
  till: {
    software: { cash: number; mp: number }
    real: { cash: number; mp: number }
  }
  earningsStore: { cash: number; mp: number }
  earningsBoulder: { cash: number; mp: number }
  user: string
  freePass: {
    fourPack: number
    eightPack: number
    total: number
  }
  lessons: {
    fourPack: number
    eightPack: number
    total: number
  }
  amountOfPeople: number
  date: string
  hour: string
  month: number
}

const transformHTML = ({
  till,
  earningsStore,
  earningsBoulder,
  user,
  freePass,
  lessons,
  amountOfPeople,
  date,
  hour,
  month,
}: TillBodyInterface) => {
  const HTML = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="es">
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
  [style*="Inter Tight"] {font-family: 'Inter Tight', BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif !important;} [style*="Josefin Sans"] {font-family: 'Josefin Sans', BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif !important;}
  @media only screen and (min-width: 481px) {.t11,.t9{border-radius:20px!important}.t25{width:800px!important}.t35{width:50.47619%!important;max-width:318px!important}.t36{padding-left:10px!important;padding-right:10px!important}.t44,.t49{padding-right:unset!important}.t56{width:68.73449%!important;max-width:277px!important}.t60{font-size:16px!important}.t64,.t69{padding-right:unset!important}.t76{width:68.73449%!important;max-width:277px!important}.t80{font-size:16px!important}.t86{width:31.26551%!important;max-width:126px!important}.t90{font-size:16px!important}.t94,.t99{padding-right:unset!important}.t106{width:68.73449%!important;max-width:277px!important}.t110{font-size:16px!important}.t116{width:31.26551%!important;max-width:126px!important}.t120{font-size:16px!important}.t154{width:277px!important}.t160{font-size:16px!important}.t166{width:31.26551%!important;max-width:126px!important}.t170{font-size:16px!important}.t174{width:49.52381%!important;max-width:312px!important}.t175{padding-left:10px!important;padding-right:10px!important}.t183{width:277px!important}.t189{font-size:16px!important}.t193,.t198{padding-right:unset!important}.t205{width:68.73449%!important;max-width:277px!important}.t209{font-size:16px!important}.t215{width:31.26551%!important;max-width:126px!important}.t219{font-size:16px!important}.t223,.t228{padding-right:unset!important}.t235{width:68.73449%!important;max-width:277px!important}.t239{font-size:16px!important}.t245{width:31.26551%!important;max-width:126px!important}.t249{font-size:16px!important}.t253,.t258{padding-right:unset!important}.t265{width:68.73449%!important;max-width:277px!important}.t269{font-size:16px!important}.t275{width:31.26551%!important;max-width:126px!important}.t279{font-size:16px!important}.t302{width:50%!important}.t303{padding-left:inherit!important;padding-right:inherit!important}.t305,.t307{padding-bottom:0!important;padding-right:5px!important}.t369{width:50%!important}.t370{padding-left:inherit!important;padding-right:inherit!important}.t372,.t374{padding-left:5px!important}.t455{width:50%!important}.t456{padding-left:inherit!important;padding-right:inherit!important}.t458,.t460{padding-bottom:0!important;padding-right:5px!important}.t522{width:50%!important}.t523{padding-left:inherit!important;padding-right:inherit!important}.t525,.t527{padding-left:5px!important}.t610,.t649{width:50%!important;max-width:303px!important}.t705{width:50%!important}.t714{width:277px!important}.t720{font-size:16px!important}.t724,.t729{padding-right:unset!important}.t736{width:68.73449%!important;max-width:277px!important}.t740{font-size:16px!important}.t746{width:31.26551%!important;max-width:126px!important}.t750{font-size:16px!important}.t754,.t759{padding-right:unset!important}.t766{width:68.73449%!important;max-width:277px!important}.t770{font-size:16px!important}.t776{width:31.26551%!important;max-width:126px!important}.t780{font-size:16px!important}.t784,.t789{padding-right:unset!important}.t796{width:68.73449%!important;max-width:277px!important}.t800{font-size:16px!important}.t806{width:31.26551%!important;max-width:126px!important}.t810{font-size:16px!important}.t814{width:50%!important}.t823{width:277px!important}.t829{font-size:16px!important}.t833,.t838{padding-right:unset!important}.t845{width:68.73449%!important;max-width:277px!important}.t849{font-size:16px!important}.t855{width:31.26551%!important;max-width:126px!important}.t859{font-size:16px!important}.t863,.t868{padding-right:unset!important}.t875{width:68.73449%!important;max-width:277px!important}.t879{font-size:16px!important}.t885{width:31.26551%!important;max-width:126px!important}.t889{font-size:16px!important}.t893,.t898{padding-right:unset!important}.t905{width:68.73449%!important;max-width:277px!important}.t909{font-size:16px!important}.t915{width:31.26551%!important;max-width:126px!important}.t919{font-size:16px!important}}
  </style>
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400&family=Inter+Tight:wght@500;600&display=swap" rel="stylesheet" type="text/css">
  <!--<![endif]-->
  <!--[if mso]>
  <style type="text/css">
  .t11,.t9{border-radius:20px !important}.t25{width:800px !important}.t35{width:50.47619% !important;max-width:318px !important}.t36{padding-left:10px !important;padding-right:10px !important}.t44,.t49{padding-right:unset !important}.t56{width:68.73449% !important;max-width:277px !important}.t60{font-size:16px !important}.t64,.t69{padding-right:unset !important}.t76{width:68.73449% !important;max-width:277px !important}.t80{font-size:16px !important}.t86{width:31.26551% !important;max-width:126px !important}.t90{font-size:16px !important}.t94,.t99{padding-right:unset !important}.t106{width:68.73449% !important;max-width:277px !important}.t110{font-size:16px !important}.t116{width:31.26551% !important;max-width:126px !important}.t120{font-size:16px !important}.t154{width:277px !important}.t160{font-size:16px !important}.t166{width:31.26551% !important;max-width:126px !important}.t170{font-size:16px !important}.t174{width:49.52381% !important;max-width:312px !important}.t175{padding-left:10px !important;padding-right:10px !important}.t183{width:277px !important}.t189{font-size:16px !important}.t193,.t198{padding-right:unset !important}.t205{width:68.73449% !important;max-width:277px !important}.t209{font-size:16px !important}.t215{width:31.26551% !important;max-width:126px !important}.t219{font-size:16px !important}.t223,.t228{padding-right:unset !important}.t235{width:68.73449% !important;max-width:277px !important}.t239{font-size:16px !important}.t245{width:31.26551% !important;max-width:126px !important}.t249{font-size:16px !important}.t253,.t258{padding-right:unset !important}.t265{width:68.73449% !important;max-width:277px !important}.t269{font-size:16px !important}.t275{width:31.26551% !important;max-width:126px !important}.t279{font-size:16px !important}.t302{width:50% !important}.t303{padding-left:inherit !important;padding-right:inherit !important}.t305,.t307{padding-bottom:0 !important;padding-right:5px !important}.t369{width:50% !important}.t370{padding-left:inherit !important;padding-right:inherit !important}.t372,.t374{padding-left:5px !important}.t455{width:50% !important}.t456{padding-left:inherit !important;padding-right:inherit !important}.t458,.t460{padding-bottom:0 !important;padding-right:5px !important}.t522{width:50% !important}.t523{padding-left:inherit !important;padding-right:inherit !important}.t525,.t527{padding-left:5px !important}.t610,.t649{width:50% !important;max-width:303px !important}.t705{width:50% !important}.t714{width:277px !important}.t720{font-size:16px !important}.t724,.t729{padding-right:unset !important}.t736{width:68.73449% !important;max-width:277px !important}.t740{font-size:16px !important}.t746{width:31.26551% !important;max-width:126px !important}.t750{font-size:16px !important}.t754,.t759{padding-right:unset !important}.t766{width:68.73449% !important;max-width:277px !important}.t770{font-size:16px !important}.t776{width:31.26551% !important;max-width:126px !important}.t780{font-size:16px !important}.t784,.t789{padding-right:unset !important}.t796{width:68.73449% !important;max-width:277px !important}.t800{font-size:16px !important}.t806{width:31.26551% !important;max-width:126px !important}.t810{font-size:16px !important}.t814{width:50% !important}.t823{width:277px !important}.t829{font-size:16px !important}.t833,.t838{padding-right:unset !important}.t845{width:68.73449% !important;max-width:277px !important}.t849{font-size:16px !important}.t855{width:31.26551% !important;max-width:126px !important}.t859{font-size:16px !important}.t863,.t868{padding-right:unset !important}.t875{width:68.73449% !important;max-width:277px !important}.t879{font-size:16px !important}.t885{width:31.26551% !important;max-width:126px !important}.t889{font-size:16px !important}.t893,.t898{padding-right:unset !important}.t905{width:68.73449% !important;max-width:277px !important}.t909{font-size:16px !important}.t915{width:31.26551% !important;max-width:126px !important}.t919{font-size:16px !important}
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
  <div style="display:none; font-size:1px; color:#333333; line-height:1px; max-height:0px; max-width:0px; opacity:0; overflow:hidden;">Cierre de caja</div><div style="font-size: 0px; line-height:0px; display: none; max-height: 0px; overflow: hidden;">&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</div><div class=t1 style="background-color:#532D75;"><table role=presentation width=100% cellpadding=0 cellspacing=0 border=0 align=center><tr><td class=t920 style="font-size:0;line-height:0;mso-line-height-rule:exactly;" valign=top align=center>
  <!--[if mso]>
  <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
  <v:fill color=#532D75 />
  </v:background>
  <![endif]-->
  <table role=presentation width=100% cellpadding=0 cellspacing=0 border=0 align=center><tr><td><div class=t3 style="mso-line-height-rule:exactly;mso-line-height-alt:88px;line-height:88px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t10 role=presentation cellpadding=0 cellspacing=0 align=center><tr>
  <!--[if !mso]><!--><td class=t11 style="background-color:#FFFFFF;overflow:hidden;width:635px;padding:41px 30px 0 30px;">
  <!--<![endif]-->
  <!--[if mso]><td style="background-color:#FFFFFF;overflow:hidden;width:695px;padding:41px 30px 0 30px;"><![endif]-->
  <table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t143 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t144 style="overflow:hidden;width:614px;padding:0 0 18px 0;"><p class=t150 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Josefin Sans';line-height:24px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;direction:ltr;color:#111111;text-align:left;mso-line-height-rule:exactly;">Cierre de Caja - ${date}</p></td>
  </tr></table>
  </td></tr><tr><td><div class=t22 style="mso-line-height-rule:exactly;mso-line-height-alt:14px;line-height:14px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t24 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t25 style="overflow:hidden;width:322px;"><div class=t31 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td class=t34 style="width:10px;" width=10></td><td width=298 valign=top><![endif]-->
  <div class=t35 style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:308px;"><div class=t36 style="padding:0 5px 0 5px;"><div class=t32 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div>
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t37><tr>
  <td class=t38 style="overflow:hidden;background-color:#F6F6F6;padding:16px 20px 17px 20px;border-radius:12px 12px 12px 12px;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t153 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t154 style="overflow:hidden;width:257px;"><p class=t160 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:14px;text-decoration:underline;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">SOFTWARE</p></td>
  </tr></table>
  </td></tr><tr><td><div class=t41 style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t43 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t44 style="overflow:hidden;width:800px;"><div class=t50 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=177.33499 valign=top><![endif]-->
  <div class=t56 style="display:inline-table;text-align:initial;vertical-align:inherit;width:47.46137%;max-width:215px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t58><tr>
  <td class=t59 style="overflow:hidden;"><p class=t60 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Efectivo</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td><td width=80.66501 valign=top><![endif]-->
  <div class=t166 style="display:inline-table;text-align:initial;vertical-align:inherit;width:52.53863%;max-width:238px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t168><tr>
  <td class=t169 style="overflow:hidden;"><p class=t170 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">$ ${
    till.software.cash
  }</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td>
  </tr></table>
  <![endif]-->
  </div></td>
  </tr></table>
  </td></tr><tr><td><div class=t61 style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t63 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t64 style="overflow:hidden;width:800px;"><div class=t70 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=177.33499 valign=top><![endif]-->
  <div class=t76 style="display:inline-table;text-align:initial;vertical-align:inherit;width:47.42647%;max-width:129px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t78><tr>
  <td class=t79 style="overflow:hidden;"><p class=t80 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Mercado Pago</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td><td width=80.66501 valign=top><![endif]-->
  <div class=t86 style="display:inline-table;text-align:initial;vertical-align:inherit;width:52.57353%;max-width:143px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t88><tr>
  <td class=t89 style="overflow:hidden;"><p class=t90 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">$ ${
    till.software.mp
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
  <table class=t93 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t94 style="overflow:hidden;width:800px;"><div class=t100 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=177.33499 valign=top><![endif]-->
  <div class=t106 style="display:inline-table;text-align:initial;vertical-align:inherit;width:47.42647%;max-width:129px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t108><tr>
  <td class=t109 style="overflow:hidden;"><p class=t110 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Total</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td><td width=80.66501 valign=top><![endif]-->
  <div class=t116 style="display:inline-table;text-align:initial;vertical-align:inherit;width:52.57353%;max-width:143px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t118><tr>
  <td class=t119 style="overflow:hidden;"><p class=t120 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">$ ${
    till.software.cash + till.software.mp
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
  <div class=t33 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></div></div>
  <!--[if mso]>
  </td><td class=t34 style="width:10px;" width=10></td><td class=t173 style="width:10px;" width=10></td><td width=292 valign=top><![endif]-->
  <div class=t174 style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:302px;"><div class=t175 style="padding:0 5px 0 5px;"><div class=t171 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div>
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t176><tr>
  <td class=t177 style="overflow:hidden;background-color:#F6F6F6;padding:16px 20px 17px 20px;border-radius:12px 12px 12px 12px;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t182 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t183 style="overflow:hidden;width:258px;"><p class=t189 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:14px;text-decoration:underline;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">FISICA</p></td>
  </tr></table>
  </td></tr><tr><td><div class=t190 style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t192 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t193 style="overflow:hidden;width:800px;"><div class=t199 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=173.21092 valign=top><![endif]-->
  <div class=t205 style="display:inline-table;text-align:initial;vertical-align:inherit;width:47.46137%;max-width:215px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t207><tr>
  <td class=t208 style="overflow:hidden;"><p class=t209 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Efectivo</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td><td width=78.78908 valign=top><![endif]-->
  <div class=t215 style="display:inline-table;text-align:initial;vertical-align:inherit;width:52.53863%;max-width:238px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t217><tr>
  <td class=t218 style="overflow:hidden;"><p class=t219 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">$ ${
    till.real.cash
  }</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td>
  </tr></table>
  <![endif]-->
  </div></td>
  </tr></table>
  </td></tr><tr><td><div class=t220 style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t222 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t223 style="overflow:hidden;width:800px;"><div class=t229 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=173.21092 valign=top><![endif]-->
  <div class=t235 style="display:inline-table;text-align:initial;vertical-align:inherit;width:47.42647%;max-width:129px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t237><tr>
  <td class=t238 style="overflow:hidden;"><p class=t239 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Mercado Pago</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td><td width=78.78908 valign=top><![endif]-->
  <div class=t245 style="display:inline-table;text-align:initial;vertical-align:inherit;width:52.57353%;max-width:143px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t247><tr>
  <td class=t248 style="overflow:hidden;"><p class=t249 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">$ ${
    till.real.mp
  }</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td>
  </tr></table>
  <![endif]-->
  </div></td>
  </tr></table>
  </td></tr><tr><td><div class=t250 style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t252 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t253 style="overflow:hidden;width:800px;"><div class=t259 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=173.21092 valign=top><![endif]-->
  <div class=t265 style="display:inline-table;text-align:initial;vertical-align:inherit;width:47.42647%;max-width:129px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t267><tr>
  <td class=t268 style="overflow:hidden;"><p class=t269 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Total</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td><td width=78.78908 valign=top><![endif]-->
  <div class=t275 style="display:inline-table;text-align:initial;vertical-align:inherit;width:52.57353%;max-width:143px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t277><tr>
  <td class=t278 style="overflow:hidden;"><p class=t279 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">$ ${
    till.real.cash + till.real.mp
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
  <div class=t172 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></div></div>
  <!--[if mso]>
  </td><td class=t173 style="width:10px;" width=10></td>
  </tr></table>
  <![endif]-->
  </div></td>
  </tr></table>
  </td></tr><tr><td><div class=t683 style="mso-line-height-rule:exactly;mso-line-height-alt:14px;line-height:14px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t690 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t691 style="overflow:hidden;width:800px;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t694 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t695 style="overflow:hidden;width:610px;"><div class=t701 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td class=t704 style="width:5px;" width=5></td><td width=295 valign=top><![endif]-->
  <div class=t705 style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:308px;"><div class=t706 style="padding:0 5px 0 5px;"><div class=t702 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div>
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t707><tr>
  <td class=t708 style="overflow:hidden;background-color:#F6F6F6;padding:16px 20px 17px 20px;border-radius:12px 12px 12px 12px;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t713 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t714 style="overflow:hidden;width:272px;"><p class=t720 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:14px;text-decoration:underline;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Facturación Boulder</p></td>
  </tr></table>
  </td></tr><tr><td><div class=t721 style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t723 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t724 style="overflow:hidden;width:800px;"><div class=t730 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=175.27295 valign=top><![endif]-->
  <div class=t736 style="display:inline-table;text-align:initial;vertical-align:inherit;width:47.46137%;max-width:215px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t738><tr>
  <td class=t739 style="overflow:hidden;"><p class=t740 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Efectivo</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td><td width=79.72705 valign=top><![endif]-->
  <div class=t746 style="display:inline-table;text-align:initial;vertical-align:inherit;width:52.53863%;max-width:238px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t748><tr>
  <td class=t749 style="overflow:hidden;"><p class=t750 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">$ ${
    earningsBoulder.cash
  }</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td>
  </tr></table>
  <![endif]-->
  </div></td>
  </tr></table>
  </td></tr><tr><td><div class=t751 style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t753 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t754 style="overflow:hidden;width:800px;"><div class=t760 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=175.27295 valign=top><![endif]-->
  <div class=t766 style="display:inline-table;text-align:initial;vertical-align:inherit;width:47.42647%;max-width:129px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t768><tr>
  <td class=t769 style="overflow:hidden;"><p class=t770 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Mercado Pago</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td><td width=79.72705 valign=top><![endif]-->
  <div class=t776 style="display:inline-table;text-align:initial;vertical-align:inherit;width:52.57353%;max-width:143px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t778><tr>
  <td class=t779 style="overflow:hidden;"><p class=t780 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">$ ${
    earningsBoulder.mp
  }</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td>
  </tr></table>
  <![endif]-->
  </div></td>
  </tr></table>
  </td></tr><tr><td><div class=t781 style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t783 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t784 style="overflow:hidden;width:800px;"><div class=t790 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=175.27295 valign=top><![endif]-->
  <div class=t796 style="display:inline-table;text-align:initial;vertical-align:inherit;width:47.42647%;max-width:129px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t798><tr>
  <td class=t799 style="overflow:hidden;"><p class=t800 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Total</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td><td width=79.72705 valign=top><![endif]-->
  <div class=t806 style="display:inline-table;text-align:initial;vertical-align:inherit;width:52.57353%;max-width:143px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t808><tr>
  <td class=t809 style="overflow:hidden;"><p class=t810 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">$ ${
    earningsBoulder.cash + earningsBoulder.mp
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
  <div class=t703 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></div></div>
  <!--[if mso]>
  </td><td class=t704 style="width:5px;" width=5></td><td class=t813 style="width:5px;" width=5></td><td width=295 valign=top><![endif]-->
  <div class=t814 style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:308px;"><div class=t815 style="padding:0 5px 0 5px;"><div class=t811 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div>
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t816><tr>
  <td class=t817 style="overflow:hidden;background-color:#F6F6F6;padding:16px 20px 17px 20px;border-radius:12px 12px 12px 12px;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t822 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t823 style="overflow:hidden;width:266px;"><p class=t829 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:14px;text-decoration:underline;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Facturación Tienda</p></td>
  </tr></table>
  </td></tr><tr><td><div class=t830 style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t832 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t833 style="overflow:hidden;width:800px;"><div class=t839 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=175.27295 valign=top><![endif]-->
  <div class=t845 style="display:inline-table;text-align:initial;vertical-align:inherit;width:47.46137%;max-width:215px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t847><tr>
  <td class=t848 style="overflow:hidden;"><p class=t849 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Efectivo</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td><td width=79.72705 valign=top><![endif]-->
  <div class=t855 style="display:inline-table;text-align:initial;vertical-align:inherit;width:52.53863%;max-width:238px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t857><tr>
  <td class=t858 style="overflow:hidden;"><p class=t859 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">$ ${
    earningsStore.cash
  }</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td>
  </tr></table>
  <![endif]-->
  </div></td>
  </tr></table>
  </td></tr><tr><td><div class=t860 style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t862 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t863 style="overflow:hidden;width:800px;"><div class=t869 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=175.27295 valign=top><![endif]-->
  <div class=t875 style="display:inline-table;text-align:initial;vertical-align:inherit;width:47.42647%;max-width:129px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t877><tr>
  <td class=t878 style="overflow:hidden;"><p class=t879 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Mercado Pago</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td><td width=79.72705 valign=top><![endif]-->
  <div class=t885 style="display:inline-table;text-align:initial;vertical-align:inherit;width:52.57353%;max-width:143px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t887><tr>
  <td class=t888 style="overflow:hidden;"><p class=t889 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">$ ${
    earningsStore.mp
  }</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td>
  </tr></table>
  <![endif]-->
  </div></td>
  </tr></table>
  </td></tr><tr><td><div class=t890 style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t892 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t893 style="overflow:hidden;width:800px;"><div class=t899 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=175.27295 valign=top><![endif]-->
  <div class=t905 style="display:inline-table;text-align:initial;vertical-align:inherit;width:47.42647%;max-width:129px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t907><tr>
  <td class=t908 style="overflow:hidden;"><p class=t909 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Total</p></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td><td width=79.72705 valign=top><![endif]-->
  <div class=t915 style="display:inline-table;text-align:initial;vertical-align:inherit;width:52.57353%;max-width:143px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t917><tr>
  <td class=t918 style="overflow:hidden;"><p class=t919 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">$ ${
    earningsStore.cash + earningsStore.mp
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
  <div class=t812 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></div></div>
  <!--[if mso]>
  </td><td class=t813 style="width:5px;" width=5></td>
  </tr></table>
  <![endif]-->
  </div></td>
  </tr></table>
  </td></tr></table></td>
  </tr></table>
  </td></tr><tr><td><div class=t280 style="mso-line-height-rule:exactly;mso-line-height-alt:14px;line-height:14px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t287 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t288 style="overflow:hidden;width:655px;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td><div class=t289 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t291 role=presentation cellpadding=0 cellspacing=0 align=center><tr>
  <!--[if !mso]><!--><td class=t292 style="background-color:#F6F6F6;overflow:hidden;width:527px;padding:30px 40px 30px 40px;border-radius:12px 12px 12px 12px;">
  <!--<![endif]-->
  <!--[if mso]><td style="background-color:#F6F6F6;overflow:hidden;width:607px;padding:30px 40px 30px 40px;border-radius:12px 12px 12px 12px;"><![endif]-->
  <div class=t298 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=263.5 valign=top><![endif]-->
  <div class=t302 style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:800px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t304><tr>
  <td class=t305 style="overflow:hidden;padding:0 0 15px 0;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t315 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t316 style="overflow:hidden;width:800px;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t319 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t320 style="overflow:hidden;width:600px;"><p class=t326 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Item</p></td>
  </tr></table>
  </td></tr><tr><td><div class=t327 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t329 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t330 style="overflow:hidden;width:600px;"><p class=t336 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Pase diario</p></td>
  </tr></table>
  </td></tr></table></td>
  </tr></table>
  </td></tr><tr><td><div class=t337 style="mso-line-height-rule:exactly;mso-line-height-alt:15px;line-height:15px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t344 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t345 style="overflow:hidden;width:800px;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t348 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t349 style="overflow:hidden;width:600px;"><p class=t355 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Pack x 4</p></td>
  </tr></table>
  </td></tr><tr><td><div class=t356 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t358 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t359 style="overflow:hidden;width:600px;"><p class=t365 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">${
    freePass.fourPack
  }</p></td>
  </tr></table>
  </td></tr></table></td>
  </tr></table>
  </td></tr></table></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td><td width=263.5 valign=top><![endif]-->
  <div class=t369 style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:800px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t371><tr>
  <td class=t372 style="overflow:hidden;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t382 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t383 style="overflow:hidden;width:800px;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t386 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t387 style="overflow:hidden;width:600px;"><p class=t393 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Pack x 8</p></td>
  </tr></table>
  </td></tr><tr><td><div class=t394 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t396 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t397 style="overflow:hidden;width:600px;"><p class=t403 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">${
    freePass.eightPack
  }</p></td>
  </tr></table>
  </td></tr></table></td>
  </tr></table>
  </td></tr><tr><td><div class=t404 style="mso-line-height-rule:exactly;mso-line-height-alt:15px;line-height:15px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t411 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t412 style="overflow:hidden;width:800px;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t415 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t416 style="overflow:hidden;width:600px;"><p class=t422 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Total</p></td>
  </tr></table>
  </td></tr><tr><td><div class=t423 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t425 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t426 style="overflow:hidden;width:600px;"><p class=t432 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#000000;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">${
    freePass.total
  }</p></td>
  </tr></table>
  </td></tr></table></td>
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
  </td></tr><tr><td><div class=t290 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></td></tr></table></td>
  </tr></table>
  </td></tr><tr><td><div class=t433 style="mso-line-height-rule:exactly;mso-line-height-alt:14px;line-height:14px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t440 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t441 style="overflow:hidden;width:800px;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td><div class=t442 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t444 role=presentation cellpadding=0 cellspacing=0 align=center><tr>
  <!--[if !mso]><!--><td class=t445 style="background-color:#F6F6F6;overflow:hidden;width:525px;padding:30px 40px 30px 40px;border-radius:12px 12px 12px 12px;">
  <!--<![endif]-->
  <!--[if mso]><td style="background-color:#F6F6F6;overflow:hidden;width:605px;padding:30px 40px 30px 40px;border-radius:12px 12px 12px 12px;"><![endif]-->
  <div class=t451 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=262.5 valign=top><![endif]-->
  <div class=t455 style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:800px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t457><tr>
  <td class=t458 style="overflow:hidden;padding:0 0 15px 0;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t468 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t469 style="overflow:hidden;width:800px;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t472 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t473 style="overflow:hidden;width:600px;"><p class=t479 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Item</p></td>
  </tr></table>
  </td></tr><tr><td><div class=t480 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t482 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t483 style="overflow:hidden;width:600px;"><p class=t489 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Clases</p></td>
  </tr></table>
  </td></tr></table></td>
  </tr></table>
  </td></tr><tr><td><div class=t490 style="mso-line-height-rule:exactly;mso-line-height-alt:15px;line-height:15px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t497 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t498 style="overflow:hidden;width:800px;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t501 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t502 style="overflow:hidden;width:600px;"><p class=t508 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Pack x 4</p></td>
  </tr></table>
  </td></tr><tr><td><div class=t509 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t511 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t512 style="overflow:hidden;width:600px;"><p class=t518 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">${
    lessons.fourPack
  }</p></td>
  </tr></table>
  </td></tr></table></td>
  </tr></table>
  </td></tr></table></td>
  </tr></table>
  </div>
  <!--[if mso]>
  </td><td width=262.5 valign=top><![endif]-->
  <div class=t522 style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:800px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t524><tr>
  <td class=t525 style="overflow:hidden;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t535 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t536 style="overflow:hidden;width:800px;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t539 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t540 style="overflow:hidden;width:600px;"><p class=t546 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Pack x 8</p></td>
  </tr></table>
  </td></tr><tr><td><div class=t547 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t549 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t550 style="overflow:hidden;width:600px;"><p class=t556 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">${
    lessons.eightPack
  }</p></td>
  </tr></table>
  </td></tr></table></td>
  </tr></table>
  </td></tr><tr><td><div class=t557 style="mso-line-height-rule:exactly;mso-line-height-alt:15px;line-height:15px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t564 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t565 style="overflow:hidden;width:800px;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t568 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t569 style="overflow:hidden;width:600px;"><p class=t575 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Total</p></td>
  </tr></table>
  </td></tr><tr><td><div class=t576 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t578 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t579 style="overflow:hidden;width:600px;"><p class=t585 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#2F4537;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">${
    lessons.total
  }</p></td>
  </tr></table>
  </td></tr></table></td>
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
  </td></tr><tr><td><div class=t443 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></td></tr></table></td>
  </tr></table>
  </td></tr><tr><td><div class=t586 style="mso-line-height-rule:exactly;mso-line-height-alt:14px;line-height:14px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t593 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t594 style="overflow:hidden;width:800px;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t597 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t598 style="overflow:hidden;width:610px;"><div class=t604 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td class=t609 style="width:34px;" width=34></td><td width=235 valign=top><![endif]-->
  <div class=t610 style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:446px;"><div class=t611 style="padding:0 34px 0 34px;"><div class=t605 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div>
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t612><tr>
  <td class=t613 style="overflow:hidden;background-color:#F6F6F6;padding:30px 40px 30px 40px;border-radius:12px 12px 12px 12px;"><div class=t614 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=155 valign=top><![endif]-->
  <div class=t618 style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:800px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t620><tr>
  <td class=t621 style="overflow:hidden;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t626 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t627 style="overflow:hidden;width:600px;"><p class=t633 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Mes</p></td>
  </tr></table>
  </td></tr><tr><td><div class=t634 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t636 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t637 style="overflow:hidden;width:600px;"><p class=t643 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">${month}</p></td>
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
  <div class=t606 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></div></div>
  <!--[if mso]>
  </td><td class=t609 style="width:34px;" width=34></td><td class=t648 style="width:34px;" width=34></td><td width=235 valign=top><![endif]-->
  <div class=t649 style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:446px;"><div class=t650 style="padding:0 34px 0 34px;"><div class=t644 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div>
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t651><tr>
  <td class=t652 style="overflow:hidden;background-color:#F6F6F6;padding:30px 40px 30px 40px;border-radius:12px 12px 12px 12px;"><div class=t653 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=155 valign=top><![endif]-->
  <div class=t657 style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:800px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t659><tr>
  <td class=t660 style="overflow:hidden;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
  <table class=t665 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t666 style="overflow:hidden;width:600px;"><p class=t672 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:600;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Asistencias Totales</p></td>
  </tr></table>
  </td></tr><tr><td><div class=t673 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t675 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t676 style="overflow:hidden;width:600px;"><p class=t682 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Inter Tight';line-height:22px;font-weight:500;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#787878;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">${amountOfPeople}</p></td>
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
  <div class=t645 style="mso-line-height-rule:exactly;mso-line-height-alt:5px;line-height:5px;font-size:1px;display:block;">&nbsp;</div></div></div>
  <!--[if mso]>
  </td><td class=t648 style="width:34px;" width=34></td>
  </tr></table>
  <![endif]-->
  </div></td>
  </tr></table>
  </td></tr></table></td>
  </tr></table>
  </td></tr><tr><td><div class=t12 style="mso-line-height-rule:exactly;mso-line-height-alt:14px;line-height:14px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t14 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t15 style="overflow:hidden;width:600px;"><p class=t21 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Josefin Sans';line-height:24px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#111111;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">La caja fue cerrada por @${user} a las ${hour} hs</p></td>
  </tr></table>
  </td></tr><tr><td><div class=t121 style="mso-line-height-rule:exactly;mso-line-height-alt:14px;line-height:14px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
  <table class=t123 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t124 style="overflow:hidden;width:800px;"><div class=t130 style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
  <!--[if mso]>
  <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=635 valign=top><![endif]-->
  <div class=t136 style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:683px;">
  <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t138><tr>
  <td class=t139 style="overflow:hidden;padding:0 0 0 573px;"><div style="font-size:0px;"><img class=t140 style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width=62 src=images/logo.png /></div></td>
  </tr></table>
  <div class=t132 style="mso-line-height-rule:exactly;mso-line-height-alt:16px;line-height:16px;font-size:1px;display:block;">&nbsp;</div></div>
  <!--[if mso]>
  </td>
  </tr></table>
  <![endif]-->
  </div></td>
  </tr></table>
  </td></tr></table></td>
  </tr></table>
  </td></tr></table></td></tr></table></div></body>
  </html>`

  return HTML
}

export default transformHTML
