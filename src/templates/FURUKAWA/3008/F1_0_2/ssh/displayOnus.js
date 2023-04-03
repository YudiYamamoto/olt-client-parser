const { connect } = require('../../../../../config/ssh-connect')
const { column2json, day2time } = require('../../../../../utils/lib')

/*
>>> Coletar os dados da ONU POR PON
----------------------------------------------------------------
 OLT : 1, ONU : 1
----------------------------------------------------------------
 Activation Status                 : Active
 Last Activation Fail Reason       : -
 Deactivation Reason               : -
 Serial Number                     : FISAMDOTESeO
 Serial Number(Hex)                : 464953414D07f9eO
 Password (R-ID)                   : 00000000000000000000
 Description                       :
 Learning Method                   : auto
 Model Name                        : 630-10B
 MAC Address                       : D8:26:d4:07:f9:e0
 Eqo / RTD                         : 246723 / 64277 bit
 Fiber Distance                    : 5m
 ONU RX Pover                      : - 14.7 dBm
 MAX T-CONT                        : 7
 MAX US Priority Queue per T-CONT  : 8 (8/8/8/8/8/8/8/)
 T-CONT Scheduling Policy          : SPQ
 Activated Time                    : 0:00:01:22
 MIB Sync Number                   : 7
 SysupTinme                        : 0:00:09:28
 InactiveTtime                     : 0:00:00:00
 Vendor Product Code               : 0x0007
 Host Name                         :
 Encryption Key                    : 58 9f 6h 89 33 95 27 25 6a 07 58 99 3a 5c 25 Of
 OMCC Version                      : 0xao
 onu-profile                       : -
 VoIP Available signal protocol    : SIP / MGCP
 VoIP Available config method      : OMCI / Configuration file
 Power over Ethernet Control       : Not support
 Remote Debug                      : Support
 Remote Debug Format               : ASCIT
*/
const displayOnus = async (options, { board = '1', slot = '1', port = '1' }) => {
  // const conn = await connect(options)

  const chunk = `---------------------------------------------------------------
  OLT : 1, ONU : 1
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : SFi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW236a33cd
  Serial Number(Hex)               : 46524b57236a33cd
  Password (R-ID)                  : 31323334353637380000
  Description                      : ALDA MACIEL DIAS DE JESUS
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:6a:33:cd
  EqD / RTD                        : 237153 / 1334450 bit
  Fiber Distance                   : 786m
  ONU RX Power                     : - 19.6 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:15
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b0 a0 13 33 29 28 02 83 20 28 92 b8 20 28 0b 9a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 1, ONU : 2
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW236a3b2d
  Serial Number(Hex)               : 46524b57236a3b2d
  Password (R-ID)                  : 31323334353637380000
  Description                      : COLEGIO EST WALDOMIRO S. C.
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:6a:3b:2d
  EqD / RTD                        : 238991 / 1332612 bit
  Fiber Distance                   : 635m
  ONU RX Power                     : - 22.2 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:44
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 31 31 02 98 29 28 9a 12 29 a1 9b ba 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 1, ONU : 4
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276b8a81
  Serial Number(Hex)               : 46524b57276b8a81
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:8a:81
  EqD / RTD                        : 239994 / 1331609 bit
  Fiber Distance                   : 553m
  ONU RX Power                     : - 21.5 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   2:01:22:11
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : cd ae 20 62 46 e9 14 fd 0f e5 bd f0 b4 f7 88 26
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 1, ONU : 6
 ---------------------------------------------------------------
  Activation Status                : Inactive
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW236a338b
  Serial Number(Hex)               : 46524b57236a338b
  Password (R-ID)                  : 31323334353637380000
  Description                      : PREF. CM PSF RETIRO
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:6a:33:8b
  EqD / RTD                        : 236802 / 1334801 bit
  Fiber Distance                   : 815m
  ONU RX Power                     : - 40.0 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:00:00:00
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:03:41:06
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 31 31 9a 13 20 28 83 12 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 1, ONU : 8
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW236a5c03
  Serial Number(Hex)               : 46524b57236a5c03
  Password (R-ID)                  : 31323334353637380000
  Description                      : Patricia Ramos de Araujo
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:6a:5c:03
  EqD / RTD                        : 238018 / 1333585 bit
  Fiber Distance                   : 715m
  ONU RX Power                     : - 19.5 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   9:22:42:59
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 20 b8 92 9a 20 28 0b 9a 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 1, ONU : 9
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW236a5bbf
  Serial Number(Hex)               : 46524b57236a5bbf
  Password (R-ID)                  : 31323334353637380000
  Description                      : GERSON DE JESUS ALMEIDA
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:6a:5b:bf
  EqD / RTD                        : 239217 / 1332386 bit
  Fiber Distance                   : 617m
  ONU RX Power                     : - 23.5 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:45
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b0 b8 02 a3 28 31 9a 13 20 28 92 b8 20 28 0b 9a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 1, ONU : 11
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW236a5b81
  Serial Number(Hex)               : 46524b57236a5b81
  Password (R-ID)                  : 31323334353637380000
  Description                      : GILDA DOS ANJOS DE JESUS
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:6a:5b:81
  EqD / RTD                        : 233885 / 1337718 bit
  Fiber Distance                   : 1054m
  ONU RX Power                     : - 23.7 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   9:04:11:14
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : a1 31 0a 13 20 28 0b 9a 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 1, ONU : 14
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW236aaca9
  Serial Number(Hex)               : 46524b57236aaca9
  Password (R-ID)                  : 31323334353637380000
  Description                      : Jose Flori Santana Melo
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:6a:ac:a9
  EqD / RTD                        : 236828 / 1334775 bit
  Fiber Distance                   : 813m
  ONU RX Power                     : - 22.4 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:45
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 29 b8 83 33 28 31 92 0a 20 28 92 b8 20 28 0b 9a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 1, ONU : 15
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW235ccb41
  Serial Number(Hex)               : 46524b57235ccb41
  Password (R-ID)                  : 31323334353637380000
  Description                      : TRANSPORTE-GD-AVANZA
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:5c:cb:41
  EqD / RTD                        : 238866 / 1332737 bit
  Fiber Distance                   : 646m
  ONU RX Power                     : - 23.0 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:46
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 20 b8 9a 33 28 31 0a 13 20 28 92 b8 20 28 0b 9a
  OMCC Version                     : 0xa0
  onu-profile                      : OP-GD-AVANZA-CEMJLS-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 1, ONU : 19
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW21629ad0
  Serial Number(Hex)               : 46524b5721629ad0
  Password (R-ID)                  : 00000000000000000000
  Description                      : Elisangela Souza Lima
  Learning Method                  : Manual
  Model Name                       : 423-41W/AC
  MAC Address                      : b8:26:d4:62:9a:d0
  EqD / RTD                        : 235496 / 1336107 bit
  Fiber Distance                   : 922m
  ONU RX Power                     : - 22.7 dBm
  MAX T-CONT                       : 8
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   5:02:22:58
  MIB Upload Count                 : 244 / 244
  MIB Sync Number                  : 46
  SysUpTime                        :   5:02:23:51
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0100
  Host Name                        :
  Encryption Key                   : 5b b8 7b 34 2c c7 1b a7 7e 48 f2 66 3b 56 bc 55
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-423-41W/AC
  VoIP Available signal protocol   : SIP
  VoIP Available config method     : OMCI / TR-69
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 1, ONU : 21
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW236aa5d3
  Serial Number(Hex)               : 46524b57236aa5d3
  Password (R-ID)                  : 31323334353637380000
  Description                      : GILDASIO VITORIA DE SENA
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:6a:a5:d3
  EqD / RTD                        : 237683 / 1333920 bit
  Fiber Distance                   : 743m
  ONU RX Power                     : - 23.0 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:47
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 29 b8 0b ba 28 31 9a 13 20 28 92 b8 20 28 0b 9a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 1, ONU : 22
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW236aa5e5
  Serial Number(Hex)               : 46524b57236aa5e5
  Password (R-ID)                  : 31323334353637380000
  Description                      : GILDASIO VITORIA DE SENA
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:6a:a5:e5
  EqD / RTD                        : 239653 / 1331950 bit
  Fiber Distance                   : 581m
  ONU RX Power                     : - 21.7 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:47
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b0 a1 9b 2a 28 31 92 0a 20 28 92 b8 20 28 0b 9a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 1, ONU : 23
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : LOSi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276b8a87
  Serial Number(Hex)               : 46524b57276b8a87
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:8a:87
  EqD / RTD                        : 233793 / 1337810 bit
  Fiber Distance                   : 1062m
  ONU RX Power                     : - 19.2 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   7:05:09:58
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 57 96 2b 68 b5 9a 8b 69 a3 4b 20 06 ee 38 ff 00
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 1, ONU : 25
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276b8b05
  Serial Number(Hex)               : 46524b57276b8b05
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:8b:05
  EqD / RTD                        : 238296 / 1333307 bit
  Fiber Distance                   : 692m
  ONU RX Power                     : - 23.1 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   1:05:24:11
  MIB Upload Count                 : 378 / 378
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : e9 18 e0 71 17 17 d7 a7 59 79 b7 d1 d8 29 98 57
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 1, ONU : 26
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bf90f
  Serial Number(Hex)               : 46524b57276bf90f
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:f9:0f
  EqD / RTD                        : 238320 / 1333283 bit
  Fiber Distance                   : 690m
  ONU RX Power                     : - 19.5 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:47
  MIB Upload Count                 : 378 / 378
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 6f 12 ae 2f 76 9d ff f8 15 ef c9 70 d3 71 bd ae
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 1, ONU : 37
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : SFi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW2782d03c
  Serial Number(Hex)               : 46524b572782d03c
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:82:d0:3c
  EqD / RTD                        : 232110 / 1339493 bit
  Fiber Distance                   : 1200m
  ONU RX Power                     : - 22.1 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:15
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 85 25 04 05 f3 5e 31 56 35 2e 7b b5 d5 f9 d7 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 2, ONU : 1
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW23821168
  Serial Number(Hex)               : 46524b5723821168
  Password (R-ID)                  : 31323334353637380000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:11:68
  EqD / RTD                        : 230729 / 1340874 bit
  Fiber Distance                   : 1313m
  ONU RX Power                     : - 19.9 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:47
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 31 30 13 33 28 31 0b 8b 20 28 92 b8 20 28 0b 9a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 2, ONU : 2
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW236aa86b
  Serial Number(Hex)               : 46524b57236aa86b
  Password (R-ID)                  : 31323334353637380000
  Description                      : Lucidalva Sodre dos Santos
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:6a:a8:6b
  EqD / RTD                        : 229423 / 1342180 bit
  Fiber Distance                   : 1420m
  ONU RX Power                     : - 22.2 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:47
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 20 a9 13 33 28 31 9b 0a 20 28 92 b8 20 28 0b 9a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 3, ONU : 1
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW236a3395
  Serial Number(Hex)               : 46524b57236a3395
  Password (R-ID)                  : 31323334353637380000
  Description                      : Domingas Ribeiro Santana
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:6a:33:95
  EqD / RTD                        : 198379 / 1373224 bit
  Fiber Distance                   : 3965m
  ONU RX Power                     : - 22.1 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:41
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 31 31 92 a3 28 31 92 8b 20 28 92 b8 20 28 0b 9a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 3, ONU : 2
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW236a4b73
  Serial Number(Hex)               : 46524b57236a4b73
  Password (R-ID)                  : 31323334353637380000
  Description                      : Jaconias Gebosky Ferreira
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:6a:4b:73
  EqD / RTD                        : 199840 / 1371763 bit
  Fiber Distance                   : 3846m
  ONU RX Power                     : - 22.2 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:46
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 29 a1 92 ba 28 31 9b 83 20 28 92 b8 20 28 0b 9a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 3, ONU : 3
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW236a8e6d
  Serial Number(Hex)               : 46524b57236a8e6d
  Password (R-ID)                  : 31323334353637380000
  Description                      : Vando Silva Cerqueira
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:6a:8e:6d
  EqD / RTD                        : 210108 / 1361495 bit
  Fiber Distance                   : 3004m
  ONU RX Power                     : - 21.2 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:46
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 29 b8 9a 33 b0 28 9a 13 b0 a1 9b b8 20 28 0b 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 3, ONU : 4
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW236aa895
  Serial Number(Hex)               : 46524b57236aa895
  Password (R-ID)                  : 31323334353637380000
  Description                      : Manoel Cez�rio Pena
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:6a:a8:95
  EqD / RTD                        : 208750 / 1362853 bit
  Fiber Distance                   : 3115m
  ONU RX Power                     : - 30.4 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:47
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 29 b8 92 a3 28 31 9b 9a 20 28 92 b8 20 28 0b 9a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 3, ONU : 5
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW2382113e
  Serial Number(Hex)               : 46524b572382113e
  Password (R-ID)                  : 31323334353637380000
  Description                      : DANILO DE SOUZA LOPES
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:11:3e
  EqD / RTD                        : 213802 / 1357801 bit
  Fiber Distance                   : 2701m
  ONU RX Power                     : - 20.7 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:47
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 42
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b0 28 9b 2a 20 28 92 9a b0 28 92 28 20 28 02 9a
  OMCC Version                     : 0xa0
  onu-profile                      : PRESET1_630-10B_11_8f9fc1
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 3, ONU : 6
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW23821148
  Serial Number(Hex)               : 46524b5723821148
  Password (R-ID)                  : 31323334353637380000
  Description                      : DOMINGOS DE SOUZA LOPES
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:11:48
  EqD / RTD                        : 213271 / 1358332 bit
  Fiber Distance                   : 2744m
  ONU RX Power                     : - 19.9 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:41
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 42
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 29 28 0a 33 b9 b8 02 0a 29 28 9b b8 20 28 02 83
  OMCC Version                     : 0xa0
  onu-profile                      : PRESET1_630-10B_11_8f9fc1
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 3, ONU : 7
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW2382114c
  Serial Number(Hex)               : 46524b572382114c
  Password (R-ID)                  : 31323334353637380000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:11:4c
  EqD / RTD                        : 206457 / 1365146 bit
  Fiber Distance                   : 3303m
  ONU RX Power                     : - 20.9 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   8:23:51:40
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 20 b8 9b 0a 20 28 0b 83 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 4, ONU : 1
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW236a5ba5
  Serial Number(Hex)               : 46524b57236a5ba5
  Password (R-ID)                  : 31323334353637380000
  Description                      : Jair Da Anuncia��o De Azevedo
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:6a:5b:a5
  EqD / RTD                        : 220454 / 1351149 bit
  Fiber Distance                   : 2155m
  ONU RX Power                     : - 20.1 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:46
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b9 b8 92 2a b8 31 0b 0a 20 28 92 a1 20 28 0b 9a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 4, ONU : 2
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : SFi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW236aa299
  Serial Number(Hex)               : 46524b57236aa299
  Password (R-ID)                  : 31323334353637380000
  Description                      : JOSE OSVALDO DE C. FREITAS
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:6a:a2:99
  EqD / RTD                        : 202423 / 1369180 bit
  Fiber Distance                   : 3634m
  ONU RX Power                     : - 19.6 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:24
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b0 28 02 2a 29 28 92 83 20 28 92 b8 20 28 0b 9a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 4, ONU : 3
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW23821172
  Serial Number(Hex)               : 46524b5723821172
  Password (R-ID)                  : 31323334353637380000
  Description                      : ELISANGELA DO AMOR D FERREIRA
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:11:72
  EqD / RTD                        : 221443 / 1350160 bit
  Fiber Distance                   : 2074m
  ONU RX Power                     : - 19.7 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:10
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 31
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b0 28 92 83 20 28 0b 9a 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PLANO10_630-10B_11_b645e3
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 4, ONU : 4
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : SFi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW235f553d
  Serial Number(Hex)               : 46524b57235f553d
  Password (R-ID)                  : 31323334353637380000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:5f:55:3d
  EqD / RTD                        : 217503 / 1354100 bit
  Fiber Distance                   : 2397m
  ONU RX Power                     : - 22.0 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:25
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 20 28 0b ba 29 28 0b 83 20 28 92 b8 20 28 0b 9a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 4, ONU : 5
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW27828faa
  Serial Number(Hex)               : 46524b5727828faa
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:82:8f:aa
  EqD / RTD                        : 200142 / 1371461 bit
  Fiber Distance                   : 3821m
  ONU RX Power                     : - 24.1 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   8:19:09:23
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 3d 6e 33 20 2c d2 70 b7 1a 0e ef 22 ce 94 2c 86
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 4, ONU : 6
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW23821152
  Serial Number(Hex)               : 46524b5723821152
  Password (R-ID)                  : 31323334353637380000
  Description                      : LIDIA NASCIMENTO SANTOS
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:11:52
  EqD / RTD                        : 217689 / 1353914 bit
  Fiber Distance                   : 2382m
  ONU RX Power                     : - 22.5 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:23:07:20
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 42
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b8 31 0a 13 20 28 0b 83 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRESET1_630-10B_11_8f9fc1
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 4, ONU : 7
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW23821140
  Serial Number(Hex)               : 46524b5723821140
  Password (R-ID)                  : 31323334353637380000
  Description                      : ISABEL CRISTINA C DE JESUS
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:11:40
  EqD / RTD                        : 215902 / 1355701 bit
  Fiber Distance                   : 2528m
  ONU RX Power                     : - 21.3 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:46
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 31
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : a1 31 0b ba 28 31 02 9a 20 28 92 b8 20 28 0b 9a
  OMCC Version                     : 0xa0
  onu-profile                      : PLANO10_630-10B_11_b645e3
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 4, ONU : 8
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : SFi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW2782ec24
  Serial Number(Hex)               : 46524b572782ec24
  Password (R-ID)                  : 31323334353637383930
  Description                      : EDUARDO DOS SANTOS DE JESUS
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:82:ec:24
  EqD / RTD                        : 222389 / 1349214 bit
  Fiber Distance                   : 1997m
  ONU RX Power                     : - 20.9 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:25
  MIB Upload Count                 : 378 / 378
  MIB Sync Number                  : 41
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 3a aa 5d 6a a4 06 be e4 8d f3 42 0f 99 50 37 1b
  OMCC Version                     : 0xa0
  onu-profile                      : PRESET1_640-10B_11_b90c71
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 6, ONU : 1
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW153647af
  Serial Number(Hex)               : 46524b57153647af
  Password (R-ID)                  : 64656661756c74000000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : LD420-10R
  MAC Address                      : b8:26:d4:36:47:af
  EqD / RTD                        : 111918 / 1459685 bit
  Fiber Distance                   : 11054m
  ONU RX Power                     : - 17.9 dBm
  MAX T-CONT                       : 8
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   7:08:26:04
  MIB Upload Count                 : 159 / 159
  MIB Sync Number                  : 26
  SysUpTime                        :   7:08:26:37
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0100
  Host Name                        :
  Encryption Key                   : 5b 66 49 db 9a 67 d3 9a 08 88 60 d9 59 de ad 35
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT420-10R
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 6, ONU : 2
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW235f676d
  Serial Number(Hex)               : 46524b57235f676d
  Password (R-ID)                  : 31323334353637380000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:5f:67:6d
  EqD / RTD                        : 114586 / 1457017 bit
  Fiber Distance                   : 10836m
  ONU RX Power                     : - 21.5 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:46
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b9 b8 0b ba 28 39 13 13 20 28 0b a1 20 28 0b 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 6, ONU : 3
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW235c2f89
  Serial Number(Hex)               : 46524b57235c2f89
  Password (R-ID)                  : 31323334353637380000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:5c:2f:89
  EqD / RTD                        : 113925 / 1457678 bit
  Fiber Distance                   : 10890m
  ONU RX Power                     : - 21.1 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   2:08:34:01
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 20 28 9b 9a 20 28 0b 83 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 6, ONU : 4
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW235c4a6d
  Serial Number(Hex)               : 46524b57235c4a6d
  Password (R-ID)                  : 31323334353637380000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:5c:4a:6d
  EqD / RTD                        : 112498 / 1459105 bit
  Fiber Distance                   : 11007m
  ONU RX Power                     : - 17.7 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   7:00:03:19
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 20 28 0b 0a 20 28 0b 9a 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 6, ONU : 5
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : SFi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW235c17f7
  Serial Number(Hex)               : 46524b57235c17f7
  Password (R-ID)                  : 31323334353637380000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:5c:17:f7
  EqD / RTD                        : 103133 / 1468470 bit
  Fiber Distance                   : 11775m
  ONU RX Power                     : - 23.4 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   9:06:20:35
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b9 b8 92 0a b9 28 0b 9a b0 a1 02 98 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 6, ONU : 6
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW1535f70f
  Serial Number(Hex)               : 46524b571535f70f
  Password (R-ID)                  : 64656661756c74000000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : LD420-10R
  MAC Address                      : b8:26:d4:35:f7:0f
  EqD / RTD                        : 110868 / 1460735 bit
  Fiber Distance                   : 11141m
  ONU RX Power                     : - 23.3 dBm
  MAX T-CONT                       : 8
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   2:05:33:32
  MIB Upload Count                 : 159 / 159
  MIB Sync Number                  : 26
  SysUpTime                        :   2:05:33:55
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0100
  Host Name                        :
  Encryption Key                   : 0a f4 63 b0 21 01 8b cc 4d 2b 72 9f 38 89 49 02
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT420-10R
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 6, ONU : 7
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW2369f223
  Serial Number(Hex)               : 46524b572369f223
  Password (R-ID)                  : 31323334353637380000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:69:f2:23
  EqD / RTD                        : 116600 / 1455003 bit
  Fiber Distance                   : 10671m
  ONU RX Power                     : - 21.9 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   2:08:33:47
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 29 b8 9b 9a 20 28 92 83 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 6, ONU : 8
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW153532f7
  Serial Number(Hex)               : 46524b57153532f7
  Password (R-ID)                  : 64656661756c74000000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : LD420-10R
  MAC Address                      : b8:26:d4:35:32:f7
  EqD / RTD                        : 113400 / 1458203 bit
  Fiber Distance                   : 10933m
  ONU RX Power                     : - 23.3 dBm
  MAX T-CONT                       : 8
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   2:08:34:02
  MIB Upload Count                 : 159 / 159
  MIB Sync Number                  : 26
  SysUpTime                        :   2:08:34:22
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0100
  Host Name                        :
  Encryption Key                   : aa 86 5e e2 ad 23 39 8a 7b 18 8e c5 de 61 c5 7a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT420-10R
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 6, ONU : 9
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW235c006b
  Serial Number(Hex)               : 46524b57235c006b
  Password (R-ID)                  : 31323334353637380000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:5c:00:6b
  EqD / RTD                        : 112278 / 1459325 bit
  Fiber Distance                   : 11025m
  ONU RX Power                     : - 20.9 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:44
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 20 a1 92 ba 28 31 92 83 20 28 92 b8 20 28 0b 9a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 6, ONU : 10
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW23821aee
  Serial Number(Hex)               : 46524b5723821aee
  Password (R-ID)                  : 31323334353637380000
  Description                      : GUSTAVO RIBEIRO DE SOUZA
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:1a:ee
  EqD / RTD                        : 97121 / 1474482 bit
  Fiber Distance                   : 12268m
  ONU RX Power                     : - 21.1 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   2:23:37:17
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 42
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 31 31 0b 83 20 28 0b 8b 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRESET1_630-10B_11_8f9fc1
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 6, ONU : 11
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW235c7e4d
  Serial Number(Hex)               : 46524b57235c7e4d
  Password (R-ID)                  : 31323334353637380000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:5c:7e:4d
  EqD / RTD                        : 116755 / 1454848 bit
  Fiber Distance                   : 10658m
  ONU RX Power                     : - 20.1 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   2:08:34:02
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 20 28 02 83 20 28 0b 83 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 6, ONU : 12
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW235c7ec1
  Serial Number(Hex)               : 46524b57235c7ec1
  Password (R-ID)                  : 31323334353637380000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:5c:7e:c1
  EqD / RTD                        : 112492 / 1459111 bit
  Fiber Distance                   : 11007m
  ONU RX Power                     : - 18.5 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   9:04:11:20
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b9 a1 92 83 20 28 0b 0a 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 6, ONU : 13
 ---------------------------------------------------------------
  Activation Status                : Inactive
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW235f672b
  Serial Number(Hex)               : 46524b57235f672b
  Password (R-ID)                  : 31323334353637380000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:5f:67:2b
  EqD / RTD                        : 111415 / 1460188 bit
  Fiber Distance                   : 11096m
  ONU RX Power                     : - 40.0 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:00:00:00
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:07:53:20
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b8 31 02 9a 20 28 92 0a 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 6, ONU : 14
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW1536635f
  Serial Number(Hex)               : 46524b571536635f
  Password (R-ID)                  : 64656661756c74000000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : LD420-10R
  MAC Address                      : b8:26:d4:36:63:5f
  EqD / RTD                        : 112638 / 1458965 bit
  Fiber Distance                   : 10996m
  ONU RX Power                     : - 19.8 dBm
  MAX T-CONT                       : 8
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:19:29:31
  MIB Upload Count                 : 159 / 159
  MIB Sync Number                  : 26
  SysUpTime                        :   0:19:30:03
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0100
  Host Name                        :
  Encryption Key                   : 73 38 3c 2a 8e a7 2c 07 c4 1a 50 83 db 3a 2d af
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT420-10R
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 6, ONU : 15
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : SFi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW235c57bd
  Serial Number(Hex)               : 46524b57235c57bd
  Password (R-ID)                  : 31323334353637380000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:5c:57:bd
  EqD / RTD                        : 111780 / 1459823 bit
  Fiber Distance                   : 11066m
  ONU RX Power                     : - 17.3 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   4:02:21:48
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b9 a1 9a 13 29 b8 9a 13 31 30 13 11 20 28 02 82
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 6, ONU : 16
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : SFi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW235c7e63
  Serial Number(Hex)               : 46524b57235c7e63
  Password (R-ID)                  : 31323334353637380000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:5c:7e:63
  EqD / RTD                        : 111375 / 1460228 bit
  Fiber Distance                   : 11099m
  ONU RX Power                     : - 16.8 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:21
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b8 31 9b 2a 28 31 9b 9a 20 28 92 b8 20 28 0b 9a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 6, ONU : 17
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW236aba8b
  Serial Number(Hex)               : 46524b57236aba8b
  Password (R-ID)                  : 31323334353637380000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:6a:ba:8b
  EqD / RTD                        : 111159 / 1460444 bit
  Fiber Distance                   : 11117m
  ONU RX Power                     : - 18.1 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   1:05:27:46
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 20 b8 83 13 20 28 92 83 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 6, ONU : 18
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW23821b12
  Serial Number(Hex)               : 46524b5723821b12
  Password (R-ID)                  : 31323334353637380000
  Description                      : GUSTAVO ROBEIRO DE SOUZA
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:1b:12
  EqD / RTD                        : 95541 / 1476062 bit
  Fiber Distance                   : 12397m
  ONU RX Power                     : - 23.1 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   2:08:34:01
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 38
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 20 a0 13 13 20 28 0b 83 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-ONT630-10B-PRE-SET
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 6, ONU : 19
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW23821020
  Serial Number(Hex)               : 46524b5723821020
  Password (R-ID)                  : 31323334353637380000
  Description                      : AUGUSTO DANTAS CAMPOS MARTINS
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:10:20
  EqD / RTD                        : 113593 / 1458010 bit
  Fiber Distance                   : 10917m
  ONU RX Power                     : - 21.9 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   2:08:34:02
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 42
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b9 a9 13 13 20 28 0b 0a 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRESET1_630-10B_11_8f9fc1
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 1
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : LOSi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcdb3
  Serial Number(Hex)               : 46524b57276bcdb3
  Password (R-ID)                  : 31323334353637383930
  Description                      : TORRE-JUAZEIRO
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:b3
  EqD / RTD                        : 56223 / 1515380 bit
  Fiber Distance                   : 15621m
  ONU RX Power                     : - 24.9 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   7:20:58:17
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 22 31 3d 69 35 74 b0 08 94 f3 eb ee cd 31 75 7e
  OMCC Version                     : 0xa0
  onu-profile                      : OP-JUAZEIRO-2304
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 2
 ---------------------------------------------------------------
  Activation Status                : Inactive
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Unspecified other
  Serial Number                    : FRKW276bcd7f
  Serial Number(Hex)               : 46524b57276bcd7f
  Password (R-ID)                  : 00000000000000000000
  Description                      : JACIARA DE JESUS SANTOS CAZUMBA
  Learning Method                  : Manual
  Model Name                       :
  MAC Address                      : 00:00:00:00:00:00
  EqD / RTD                        : 0 / 1571603 bit
  Fiber Distance                   : 0m
  ONU RX Power                     : - 40.0 dBm
  MAX T-CONT                       : 0
  MAX US Priority Queue per T-CONT : 0 ()
  T-CONT Scheduling Policy         : Null
  Activated Time                   :   0:00:00:00
  MIB Upload Count                 : 0 / 0
  MIB Sync Number                  : 0
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :  12:05:55:11
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  OMCC Version                     : 0x00
  onu-profile                      : PRO-ONT640-10B-PRE-SET
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 3
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276ba5c9
  Serial Number(Hex)               : 46524b57276ba5c9
  Password (R-ID)                  : 31323334353637383930
  Description                      : MARLENE ONOFRE FRANCELINO
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:a5:c9
  EqD / RTD                        : 47211 / 1524392 bit
  Fiber Distance                   : 16360m
  ONU RX Power                     : - 24.1 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:46
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 37
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 3c fe fa 4d 3e b1 2e 56 a6 f7 4e bc ce 9e 7e d1
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-ONT640-10B-PRE-SET
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 4
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276ba5f9
  Serial Number(Hex)               : 46524b57276ba5f9
  Password (R-ID)                  : 31323334353637383930
  Description                      : ROQUE LUIZ DE JESUS CARVALHO
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:a5:f9
  EqD / RTD                        : 49114 / 1522489 bit
  Fiber Distance                   : 16204m
  ONU RX Power                     : - 25.6 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   2:22:42:15
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 37
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : b7 02 3f d7 74 45 a1 de 28 d5 d7 cf 48 50 7b b5
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-ONT640-10B-PRE-SET
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 5
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcda7
  Serial Number(Hex)               : 46524b57276bcda7
  Password (R-ID)                  : 31323334353637383930
  Description                      : PAULO CESAR LEAO DOS SANTOS
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:a7
  EqD / RTD                        : 55151 / 1516452 bit
  Fiber Distance                   : 15709m
  ONU RX Power                     : - 25.0 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   9:19:14:18
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 41
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 5f 55 84 c9 b3 83 1a f0 61 7b 1b 40 d8 ca 01 a5
  OMCC Version                     : 0xa0
  onu-profile                      : PRESET1_640-10B_11_b90c71
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 6
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcd93
  Serial Number(Hex)               : 46524b57276bcd93
  Password (R-ID)                  : 31323334353637383930
  Description                      : POLIANA MARTINS DA SILVA
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:93
  EqD / RTD                        : 50383 / 1521220 bit
  Fiber Distance                   : 16100m
  ONU RX Power                     : - 27.2 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:04:42:44
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 41
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : b5 3b 21 c0 69 55 cc 4e a7 c6 65 9f e3 0e f1 4a
  OMCC Version                     : 0xa0
  onu-profile                      : PRESET1_640-10B_11_b90c71
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 7
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcd6f
  Serial Number(Hex)               : 46524b57276bcd6f
  Password (R-ID)                  : 31323334353637383930
  Description                      : SEM-ID
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:6f
  EqD / RTD                        : 47946 / 1523657 bit
  Fiber Distance                   : 16300m
  ONU RX Power                     : - 25.3 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:32
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 37
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : a8 4f 17 31 5f 04 d7 ec 71 46 b0 ed 58 f3 76 66
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-ONT640-10B-PRE-SET
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 8
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : SFi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcdad
  Serial Number(Hex)               : 46524b57276bcdad
  Password (R-ID)                  : 31323334353637383930
  Description                      : MARIA NASCIMENTO PAES C SILVA
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:ad
  EqD / RTD                        : 49605 / 1521998 bit
  Fiber Distance                   : 16164m
  ONU RX Power                     : - 27.4 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   4:03:44:16
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 41
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 6d 96 49 c9 bf a1 ce 48 20 c4 cc 49 e9 88 94 f1
  OMCC Version                     : 0xa0
  onu-profile                      : PRESET1_640-10B_11_b90c71
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 9
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : SFi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcdb1
  Serial Number(Hex)               : 46524b57276bcdb1
  Password (R-ID)                  : 31323334353637383930
  Description                      : NAIARA PEDRO CERQUEIRA
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:b1
  EqD / RTD                        : 50071 / 1521532 bit
  Fiber Distance                   : 16126m
  ONU RX Power                     : - 27.2 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:09:15:14
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 41
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 45 71 aa 23 61 d0 ee 96 2b 3a da e6 41 64 42 98
  OMCC Version                     : 0xa0
  onu-profile                      : PRESET1_640-10B_11_b90c71
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 10
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276ba5c5
  Serial Number(Hex)               : 46524b57276ba5c5
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:a5:c5
  EqD / RTD                        : 48199 / 1523404 bit
  Fiber Distance                   : 16279m
  ONU RX Power                     : - 26.3 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   2:18:11:30
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : ff 7d dd 91 c5 5c c5 ff 96 c1 bf 45 6c 4f af 6b
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 11
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcdc9
  Serial Number(Hex)               : 46524b57276bcdc9
  Password (R-ID)                  : 31323334353637383930
  Description                      : ROBERT ASSIS MACIEL FIAES
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:c9
  EqD / RTD                        : 57264 / 1514339 bit
  Fiber Distance                   : 15536m
  ONU RX Power                     : - 25.0 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   1:17:41:30
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 41
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : bd c1 59 1f 8a b2 72 52 f2 19 34 f5 db 34 59 a6
  OMCC Version                     : 0xa0
  onu-profile                      : PRESET1_640-10B_11_b90c71
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 12
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcd99
  Serial Number(Hex)               : 46524b57276bcd99
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:99
  EqD / RTD                        : 60167 / 1511436 bit
  Fiber Distance                   : 15298m
  ONU RX Power                     : - 26.3 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:07:19:14
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : d8 85 89 1e 2f 28 21 97 77 69 94 3f de f4 45 f7
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 13
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcdcd
  Serial Number(Hex)               : 46524b57276bcdcd
  Password (R-ID)                  : 31323334353637383930
  Description                      : SUREIDE DIAS DOS SANTOS
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:cd
  EqD / RTD                        : 58930 / 1512673 bit
  Fiber Distance                   : 15399m
  ONU RX Power                     : - 25.5 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:05:52:44
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 41
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : ed e0 ae a2 c9 6e 00 0f 18 c9 1e c8 d7 c9 17 2d
  OMCC Version                     : 0xa0
  onu-profile                      : PRESET1_640-10B_11_b90c71
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 14
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : SFi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcdbb
  Serial Number(Hex)               : 46524b57276bcdbb
  Password (R-ID)                  : 31323334353637383930
  Description                      : JUCICLEIDE DE JESUS SANTOS
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:bb
  EqD / RTD                        : 47630 / 1523973 bit
  Fiber Distance                   : 16326m
  ONU RX Power                     : - 27.2 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:06:52:59
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 41
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 4c 3b 40 23 c0 18 5d 50 65 ca 8e cc 38 70 9c 59
  OMCC Version                     : 0xa0
  onu-profile                      : PRESET1_640-10B_11_b90c71
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 15
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcde1
  Serial Number(Hex)               : 46524b57276bcde1
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:e1
  EqD / RTD                        : 54159 / 1517444 bit
  Fiber Distance                   : 15790m
  ONU RX Power                     : - 28.5 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   9:22:58:19
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 02 10 ee a8 a1 ba 2c e7 fd c2 9f 9d 43 82 d7 37
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 16
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcd83
  Serial Number(Hex)               : 46524b57276bcd83
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:83
  EqD / RTD                        : 55806 / 1515797 bit
  Fiber Distance                   : 15655m
  ONU RX Power                     : - 24.8 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   7:08:35:33
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 9e a2 f6 91 d0 04 9a ca 62 c3 a6 60 7d 5b e5 87
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 17
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcd95
  Serial Number(Hex)               : 46524b57276bcd95
  Password (R-ID)                  : 31323334353637383930
  Description                      : JUSCELINO ONOFRE DA SILVA
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:95
  EqD / RTD                        : 49391 / 1522212 bit
  Fiber Distance                   : 16181m
  ONU RX Power                     : - 25.3 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:44
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 41
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 2b f8 09 51 e2 5a 95 a1 15 5b 1f a6 56 9b 69 ec
  OMCC Version                     : 0xa0
  onu-profile                      : PRESET1_640-10B_11_b90c71
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 18
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcd69
  Serial Number(Hex)               : 46524b57276bcd69
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:69
  EqD / RTD                        : 53370 / 1518233 bit
  Fiber Distance                   : 15855m
  ONU RX Power                     : - 24.1 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   3:15:05:16
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 62 b9 af 09 73 30 e3 1e 74 e1 37 e8 ce 11 49 b6
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 19
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcd9d
  Serial Number(Hex)               : 46524b57276bcd9d
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:9d
  EqD / RTD                        : 54268 / 1517335 bit
  Fiber Distance                   : 15781m
  ONU RX Power                     : - 24.4 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:47
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 01 e8 c1 7b ee 74 f0 df 30 e5 6a 34 be 8e 96 20
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 20
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : SFi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcde7
  Serial Number(Hex)               : 46524b57276bcde7
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:e7
  EqD / RTD                        : 51428 / 1520175 bit
  Fiber Distance                   : 16014m
  ONU RX Power                     : - 29.5 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   1:03:18:45
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : b2 8d ac 07 3f d8 0d 97 fa 6e 44 87 0c 3c 3e c7
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 21
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : SFi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW23821ae6
  Serial Number(Hex)               : 46524b5723821ae6
  Password (R-ID)                  : 31323334353637380000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:1a:e6
  EqD / RTD                        : 38979 / 1532624 bit
  Fiber Distance                   : 17035m
  ONU RX Power                     : - 27.9 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   3:05:27:46
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 28 31 02 08 20 28 9b 0a 20 a1 0a 33 20 28 0b 83
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 22
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcdc7
  Serial Number(Hex)               : 46524b57276bcdc7
  Password (R-ID)                  : 31323334353637383930
  Description                      : VALDINEIA SILVA SANTOS
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:c7
  EqD / RTD                        : 48748 / 1522855 bit
  Fiber Distance                   : 16234m
  ONU RX Power                     : - 26.1 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:02:36:30
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 41
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 9f 14 b1 aa b3 36 58 d9 67 0a 16 9c 30 c0 83 6a
  OMCC Version                     : 0xa0
  onu-profile                      : PRESET1_640-10B_11_b90c71
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 23
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcdd5
  Serial Number(Hex)               : 46524b57276bcdd5
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:d5
  EqD / RTD                        : 39028 / 1532575 bit
  Fiber Distance                   : 17031m
  ONU RX Power                     : - 24.6 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   9:22:56:19
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : d7 ec 0f ca 25 8b 2f 42 32 58 0e 1e 60 0a ea 1f
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 24
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcdcf
  Serial Number(Hex)               : 46524b57276bcdcf
  Password (R-ID)                  : 31323334353637383930
  Description                      : PAULO CESAR CERQUEIRA DOS SANTOS
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:cf
  EqD / RTD                        : 37962 / 1533641 bit
  Fiber Distance                   : 17118m
  ONU RX Power                     : - 29.2 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   3:21:24:17
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 37
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 9d b4 ec 2d a8 f9 e2 a6 79 2b 91 64 9e 3d 22 12
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-ONT640-10B-PRE-SET
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 25
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : SFi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcdd3
  Serial Number(Hex)               : 46524b57276bcdd3
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:d3
  EqD / RTD                        : 53269 / 1518334 bit
  Fiber Distance                   : 15863m
  ONU RX Power                     : - 25.5 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:20
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : d1 00 a9 62 22 b5 83 52 0d 86 ab d2 63 b5 79 6f
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 26
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcddb
  Serial Number(Hex)               : 46524b57276bcddb
  Password (R-ID)                  : 31323334353637383930
  Description                      : ROMUALDO NUNES MACEDO JUNIOR
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:db
  EqD / RTD                        : 46741 / 1524862 bit
  Fiber Distance                   : 16399m
  ONU RX Power                     : - 25.5 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   1:17:18:16
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 37
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : ab b7 9b 5a 23 16 0e 9b b9 5f e1 73 1a 81 e3 60
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-ONT640-10B-PRE-SET
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 27
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcdf9
  Serial Number(Hex)               : 46524b57276bcdf9
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:f9
  EqD / RTD                        : 49990 / 1521613 bit
  Fiber Distance                   : 16132m
  ONU RX Power                     : - 26.0 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   5:23:12:02
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : e2 4f ae 4b c0 63 c1 31 ff ab 39 a8 a8 04 7c 0d
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 28
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : SFi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcdb9
  Serial Number(Hex)               : 46524b57276bcdb9
  Password (R-ID)                  : 31323334353637383930
  Description                      : CELIANE CERQUEIRA DA SILVA
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:b9
  EqD / RTD                        : 57052 / 1514551 bit
  Fiber Distance                   : 15553m
  ONU RX Power                     : - 27.6 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   1:06:58:31
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 37
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 82 98 d2 70 13 06 08 75 79 03 56 ae 19 af 25 22
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-ONT640-10B-PRE-SET
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 29
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcd91
  Serial Number(Hex)               : 46524b57276bcd91
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:91
  EqD / RTD                        : 54897 / 1516706 bit
  Fiber Distance                   : 15730m
  ONU RX Power                     : - 27.2 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   9:22:42:04
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 37
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 32 67 98 40 e5 d7 23 7a f3 cd 49 25 9d 30 80 11
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-ONT640-10B-PRE-SET
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 30
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : SFi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcd87
  Serial Number(Hex)               : 46524b57276bcd87
  Password (R-ID)                  : 31323334353637383930
  Description                      : ADELAIDE PEREIRA DOS SANTOS
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:87
  EqD / RTD                        : 53961 / 1517642 bit
  Fiber Distance                   : 15807m
  ONU RX Power                     : - 26.3 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:07:33:15
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 41
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 49 14 ce 86 5c f4 b9 33 7b 21 a1 38 07 20 ba 8c
  OMCC Version                     : 0xa0
  onu-profile                      : PRESET1_640-10B_11_b90c71
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 31
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : SFi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcdb7
  Serial Number(Hex)               : 46524b57276bcdb7
  Password (R-ID)                  : 31323334353637383930
  Description                      : OSVALDINA MARIA NERES SANTOS
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:b7
  EqD / RTD                        : 46560 / 1525043 bit
  Fiber Distance                   : 16413m
  ONU RX Power                     : - 25.2 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:18
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : a9 7b 4f 5f dd 0e a1 a8 6d 8e 48 ae 1c 2f 20 38
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 32
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcd89
  Serial Number(Hex)               : 46524b57276bcd89
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:89
  EqD / RTD                        : 52434 / 1519169 bit
  Fiber Distance                   : 15932m
  ONU RX Power                     : - 25.5 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   9:04:11:04
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : dd 8a 4e 75 10 76 77 9f d7 c7 85 6b 1d e9 01 ea
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 33
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcd9b
  Serial Number(Hex)               : 46524b57276bcd9b
  Password (R-ID)                  : 31323334353637383930
  Description                      : MARIANA ANUCIAN DA S COUTINHO
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:9b
  EqD / RTD                        : 58932 / 1512671 bit
  Fiber Distance                   : 15399m
  ONU RX Power                     : - 24.1 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   4:05:53:32
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 41
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 1e 59 ce 0c 06 4a 7f 6e 9b 72 e6 23 ad 4d 93 46
  OMCC Version                     : 0xa0
  onu-profile                      : PRESET1_640-10B_11_b90c71
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 34
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcdf7
  Serial Number(Hex)               : 46524b57276bcdf7
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:f7
  EqD / RTD                        : 59787 / 1511816 bit
  Fiber Distance                   : 15329m
  ONU RX Power                     : - 24.3 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   9:22:28:19
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 83 b4 76 97 3f d5 58 92 52 4b f2 e0 9d b9 b1 ec
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 35
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : SFi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcd6b
  Serial Number(Hex)               : 46524b57276bcd6b
  Password (R-ID)                  : 31323334353637383930
  Description                      : DAMIAO RAMOS DOS SANTOS
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:6b
  EqD / RTD                        : 58278 / 1513325 bit
  Fiber Distance                   : 15453m
  ONU RX Power                     : - 23.8 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:05
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 37
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 97 f8 30 34 45 16 56 f2 ac 36 c2 87 29 31 a5 e7
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-ONT640-10B-PRE-SET
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 36
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcde3
  Serial Number(Hex)               : 46524b57276bcde3
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:e3
  EqD / RTD                        : 50562 / 1521041 bit
  Fiber Distance                   : 16085m
  ONU RX Power                     : - 26.9 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   3:03:27:31
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 8c b3 88 ea 1a be c7 90 1d 8d e4 f0 e0 4b 84 2b
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 37
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcdf3
  Serial Number(Hex)               : 46524b57276bcdf3
  Password (R-ID)                  : 31323334353637383930
  Description                      : Manoel Getulio de Jesus Silva
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:f3
  EqD / RTD                        : 52207 / 1519396 bit
  Fiber Distance                   : 15950m
  ONU RX Power                     : - 25.2 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   6:20:40:33
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 37
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : c8 62 1a fb ce 88 f7 2f 95 0d 78 7f 83 a2 44 7a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-ONT640-10B-PRE-SET
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 38
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bcda3
  Serial Number(Hex)               : 46524b57276bcda3
  Password (R-ID)                  : 31323334353637383930
  Description                      : JEANE ALVES DE CARVALHO
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:cd:a3
  EqD / RTD                        : 59356 / 1512247 bit
  Fiber Distance                   : 15364m
  ONU RX Power                     : - 24.1 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   1:01:19:15
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 41
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : a3 bb 30 e8 f1 09 57 17 63 51 32 64 7d 81 7a a2
  OMCC Version                     : 0xa0
  onu-profile                      : PRESET1_640-10B_11_b90c71
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 39
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW2382124c
  Serial Number(Hex)               : 46524b572382124c
  Password (R-ID)                  : 31323334353637380000
  Description                      : AGNALDO SILVA DOS SANTOS
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:12:4c
  EqD / RTD                        : 43367 / 1528236 bit
  Fiber Distance                   : 16675m
  ONU RX Power                     : - 25.0 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   6:01:22:02
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 38
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b0 a1 83 13 20 28 92 0a 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-ONT630-10B-PRE-SET
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 40
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW23821270
  Serial Number(Hex)               : 46524b5723821270
  Password (R-ID)                  : 31323334353637380000
  Description                      : JOSE FRANCISCO COSTA SANTOS
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:12:70
  EqD / RTD                        : 51037 / 1520566 bit
  Fiber Distance                   : 16046m
  ONU RX Power                     : - 26.3 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:44
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 38
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b9 a1 92 a3 31 39 13 13 20 28 0b a0 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-ONT630-10B-PRE-SET
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 41
 ---------------------------------------------------------------
  Activation Status                : Inactive
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW23821264
  Serial Number(Hex)               : 46524b5723821264
  Password (R-ID)                  : 31323334353637380000
  Description                      : IVAN OLIVEIRA DOS SANTOS
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:12:64
  EqD / RTD                        : 47024 / 1524579 bit
  Fiber Distance                   : 16375m
  ONU RX Power                     : - 40.0 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:00:00:00
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 38
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   1:08:35:41
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 29 a1 0b 9a 20 28 0b 9a 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-ONT630-10B-PRE-SET
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 42
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW23821006
  Serial Number(Hex)               : 46524b5723821006
  Password (R-ID)                  : 31323334353637380000
  Description                      : TATIANE SILVA DE OLIVEIRA
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:10:06
  EqD / RTD                        : 33679 / 1537924 bit
  Fiber Distance                   : 17470m
  ONU RX Power                     : - 25.2 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:45
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 42
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b8 31 0b 98 b9 28 92 83 29 a1 0b 2a 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRESET1_630-10B_11_8f9fc1
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 43
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW23820fd8
  Serial Number(Hex)               : 46524b5723820fd8
  Password (R-ID)                  : 31323334353637380000
  Description                      : MARCELIDE FERREIRA DE JESUS
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:0f:d8
  EqD / RTD                        : 37772 / 1533831 bit
  Fiber Distance                   : 17134m
  ONU RX Power                     : - 28.2 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   9:02:46:34
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 42
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b0 28 92 83 20 28 0b 9a 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRESET1_630-10B_11_8f9fc1
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 44
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : SFi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW238215be
  Serial Number(Hex)               : 46524b57238215be
  Password (R-ID)                  : 31323334353637380000
  Description                      : ANDERSON BARBOSA APOLINARIO
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:15:be
  EqD / RTD                        : 47576 / 1524027 bit
  Fiber Distance                   : 16330m
  ONU RX Power                     : - 26.9 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:17
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 211
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 20 b8 92 a3 29 28 0b 0a 20 28 92 b8 20 28 0b 9a
  OMCC Version                     : 0xa0
  onu-profile                      : PLANO10_630-10B_11_b645e3
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 45
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : SFi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW238215cc
  Serial Number(Hex)               : 46524b57238215cc
  Password (R-ID)                  : 31323334353637380000
  Description                      : ANA MARIA DANTAS DOS SANTOS
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:15:cc
  EqD / RTD                        : 48393 / 1523210 bit
  Fiber Distance                   : 16263m
  ONU RX Power                     : - 26.7 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   7:00:18:48
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 20 28 92 83 b0 a1 0b 9a b0 28 0b 08 20 28 02 83
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 46
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW23820fda
  Serial Number(Hex)               : 46524b5723820fda
  Password (R-ID)                  : 31323334353637380000
  Description                      : JOAO GERALDINO XAVIER CUNHA
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:0f:da
  EqD / RTD                        : 46815 / 1524788 bit
  Fiber Distance                   : 16393m
  ONU RX Power                     : - 26.7 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:44
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 31
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b9 b8 9a 11 29 28 02 83 29 a1 83 33 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PLANO10_630-10B_11_b645e3
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 47
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW238215c0
  Serial Number(Hex)               : 46524b57238215c0
  Password (R-ID)                  : 31323334353637380000
  Description                      : MARIA JOSE DE SOUZA
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:15:c0
  EqD / RTD                        : 54863 / 1516740 bit
  Fiber Distance                   : 15733m
  ONU RX Power                     : - 25.6 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   9:22:16:19
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 31
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 28 31 9b 83 20 28 83 13 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PLANO10_630-10B_11_b645e3
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 48
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW238215da
  Serial Number(Hex)               : 46524b57238215da
  Password (R-ID)                  : 31323334353637380000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:15:da
  EqD / RTD                        : 59688 / 1511915 bit
  Fiber Distance                   : 15337m
  ONU RX Power                     : - 26.0 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   9:22:33:19
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 38
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 20 a1 83 13 20 28 0b 83 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-ONT630-10B-PRE-SET
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 49
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW238215ca
  Serial Number(Hex)               : 46524b57238215ca
  Password (R-ID)                  : 31323334353637380000
  Description                      : MARIA DAS DORES BITENCOURT
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:15:ca
  EqD / RTD                        : 55363 / 1516240 bit
  Fiber Distance                   : 15692m
  ONU RX Power                     : - 24.3 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   9:22:52:34
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 42
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b0 28 0a 13 20 28 0b 0a 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRESET1_630-10B_11_8f9fc1
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 50
 ---------------------------------------------------------------
  Activation Status                : Inactive
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Unspecified other
  Serial Number                    : FRKW238215a0
  Serial Number(Hex)               : 46524b57238215a0
  Password (R-ID)                  : 00000000000000000000
  Description                      : IRENICE PAES COELHO DA SILVA
  Learning Method                  : Manual
  Model Name                       :
  MAC Address                      : 00:00:00:00:00:00
  EqD / RTD                        : 0 / 1571603 bit
  Fiber Distance                   : 0m
  ONU RX Power                     : - 40.0 dBm
  MAX T-CONT                       : 0
  MAX US Priority Queue per T-CONT : 0 ()
  T-CONT Scheduling Policy         : Null
  Activated Time                   :   0:00:00:00
  MIB Upload Count                 : 0 / 0
  MIB Sync Number                  : 0
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :  12:05:55:11
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  OMCC Version                     : 0x00
  onu-profile                      : PLANO10_630-10B_11_b645e3
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 51
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW238215dc
  Serial Number(Hex)               : 46524b57238215dc
  Password (R-ID)                  : 31323334353637380000
  Description                      : RODRIGO FERREIRA DOS SANTOS
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:15:dc
  EqD / RTD                        : 51736 / 1519867 bit
  Fiber Distance                   : 15989m
  ONU RX Power                     : - 24.1 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   9:23:05:49
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 38
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 29 a1 02 0a 20 28 83 13 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-ONT630-10B-PRE-SET
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 52
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW23821572
  Serial Number(Hex)               : 46524b5723821572
  Password (R-ID)                  : 31323334353637380000
  Description                      : EDILSON OLIVEIRA DA SILVA
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:15:72
  EqD / RTD                        : 31257 / 1540346 bit
  Fiber Distance                   : 17668m
  ONU RX Power                     : - 25.3 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   9:20:55:19
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 42
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b9 28 0b 9a 20 28 92 0a 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRESET1_630-10B_11_8f9fc1
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 53
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW238215d0
  Serial Number(Hex)               : 46524b57238215d0
  Password (R-ID)                  : 31323334353637380000
  Description                      : JUSSARA MOURA BATISTA
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:15:d0
  EqD / RTD                        : 54957 / 1516646 bit
  Fiber Distance                   : 15725m
  ONU RX Power                     : - 23.7 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   6:22:57:03
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 31
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 28 31 83 13 20 28 0b 0a 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PLANO10_630-10B_11_b645e3
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 54
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW238215ce
  Serial Number(Hex)               : 46524b57238215ce
  Password (R-ID)                  : 31323334353637380000
  Description                      : GABRIEL ANTONIO S. DA ANUNCIACAO
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:15:ce
  EqD / RTD                        : 50445 / 1521158 bit
  Fiber Distance                   : 16095m
  ONU RX Power                     : - 26.3 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   1:20:36:01
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 38
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 29 a1 02 9a 20 28 0b 9a 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-ONT630-10B-PRE-SET
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 55
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW27830236
  Serial Number(Hex)               : 46524b5727830236
  Password (R-ID)                  : 31323334353637383930
  Description                      : JUCIMARA PEREIRA DE OLIVEIRA
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:83:02:36
  EqD / RTD                        : 45544 / 1526059 bit
  Fiber Distance                   : 16497m
  ONU RX Power                     : - 26.1 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   2:01:59:01
  MIB Upload Count                 : 378 / 378
  MIB Sync Number                  : 37
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : c3 7d 90 a1 ff 1d 93 63 8d 10 66 61 28 03 bb 97
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-ONT640-10B-PRE-SET
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 56
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW2782f61e
  Serial Number(Hex)               : 46524b572782f61e
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:82:f6:1e
  EqD / RTD                        : 48874 / 1522729 bit
  Fiber Distance                   : 16224m
  ONU RX Power                     : - 26.0 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   6:01:15:47
  MIB Upload Count                 : 378 / 378
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : fb 7f 73 e5 5f df ec ea 8c 4e d6 b6 9c 7b 54 75
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 7, ONU : 57
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW2782ec9e
  Serial Number(Hex)               : 46524b572782ec9e
  Password (R-ID)                  : 31323334353637383930
  Description                      : IZAIAS DE FIGUEREDO FERREIRA
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:82:ec:9e
  EqD / RTD                        : 38259 / 1533344 bit
  Fiber Distance                   : 17094m
  ONU RX Power                     : - 25.5 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   6:05:49:03
  MIB Upload Count                 : 378 / 378
  MIB Sync Number                  : 37
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : e5 fa 75 e0 9b 69 1d 89 46 3d a6 e2 3d dc 92 1b
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-ONT640-10B-PRE-SET
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 1
 ---------------------------------------------------------------
  Activation Status                : Inactive
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Unspecified other
  Serial Number                    : FRKW235ca80b
  Serial Number(Hex)               : 46524b57235ca80b
  Password (R-ID)                  : 00000000000000000000
  Description                      : Arlindo Ferreira Apolin�rio
  Learning Method                  : Manual
  Model Name                       :
  MAC Address                      : 00:00:00:00:00:00
  EqD / RTD                        : 0 / 1571603 bit
  Fiber Distance                   : 0m
  ONU RX Power                     : - 40.0 dBm
  MAX T-CONT                       : 0
  MAX US Priority Queue per T-CONT : 0 ()
  T-CONT Scheduling Policy         : Null
  Activated Time                   :   0:00:00:00
  MIB Upload Count                 : 0 / 0
  MIB Sync Number                  : 0
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :  12:05:55:11
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  OMCC Version                     : 0x00
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 2
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : LOSi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW235f674d
  Serial Number(Hex)               : 46524b57235f674d
  Password (R-ID)                  : 31323334353637380000
  Description                      : MARIA SOARES COSTA
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:5f:67:4d
  EqD / RTD                        : 121153 / 1450450 bit
  Fiber Distance                   : 10297m
  ONU RX Power                     : - 20.8 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:05:42:58
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b0 28 20 2a 28 31 9b 9a a1 31 b9 a1 20 28 92 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 3
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : LOSi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW235f673f
  Serial Number(Hex)               : 46524b57235f673f
  Password (R-ID)                  : 31323334353637380000
  Description                      : ROSINEIDE DA SILVA ALVES
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:5f:67:3f
  EqD / RTD                        : 121046 / 1450557 bit
  Fiber Distance                   : 10306m
  ONU RX Power                     : - 20.8 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:05:42:43
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 28 31 22 a3 28 31 0a 13 28 31 a3 31 20 28 0b 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 4
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : LOSi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW235c4a6b
  Serial Number(Hex)               : 46524b57235c4a6b
  Password (R-ID)                  : 31323334353637380000
  Description                      : Vania dos Santos Ferreira
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:5c:4a:6b
  EqD / RTD                        : 121177 / 1450426 bit
  Fiber Distance                   : 10295m
  ONU RX Power                     : - 20.6 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:05:42:43
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 28 31 20 83 29 a1 0b 83 29 28 b0 81 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 5
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : LOSi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW236aa2a7
  Serial Number(Hex)               : 46524b57236aa2a7
  Password (R-ID)                  : 31323334353637380000
  Description                      : Lucineide Ferreira de Jesus
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:6a:a2:a7
  EqD / RTD                        : 111567 / 1460036 bit
  Fiber Distance                   : 11083m
  ONU RX Power                     : - 20.9 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:05:42:57
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : a1 31 98 31 29 a1 92 0a 20 a1 a3 13 20 28 02 83
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 6
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : LOSi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW235f5863
  Serial Number(Hex)               : 46524b57235f5863
  Password (R-ID)                  : 31323334353637380000
  Description                      : Diego Pereira Melo
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:5f:58:63
  EqD / RTD                        : 121160 / 1450443 bit
  Fiber Distance                   : 10297m
  ONU RX Power                     : - 20.2 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:05:42:57
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 29 b8 b2 ba b0 b8 9a 13 b9 b8 22 b8 20 28 02 83
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 7
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : LOSi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW236a8e8d
  Serial Number(Hex)               : 46524b57236a8e8d
  Password (R-ID)                  : 31323334353637380000
  Description                      : Hamilton Batista de Jesus
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:6a:8e:8d
  EqD / RTD                        : 111701 / 1459902 bit
  Fiber Distance                   : 11072m
  ONU RX Power                     : - 19.9 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:05:42:58
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b9 28 90 ba 29 a1 92 0a 20 a1 81 31 20 28 02 83
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 8
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : LOSi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW235c00f1
  Serial Number(Hex)               : 46524b57235c00f1
  Password (R-ID)                  : 31323334353637380000
  Description                      : Luzinete Ferreira dos Santos
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:5c:00:f1
  EqD / RTD                        : 106833 / 1464770 bit
  Fiber Distance                   : 11471m
  ONU RX Power                     : - 21.1 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:05:43:13
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b9 ba 20 ba 29 a1 02 9a 20 a3 a1 31 20 28 02 83
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 9
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : LOSi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW238203a6
  Serial Number(Hex)               : 46524b57238203a6
  Password (R-ID)                  : 31323334353637380000
  Description                      : JOSUE DOS SANTOS DE JESUS
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:03:a6
  EqD / RTD                        : 111233 / 1460370 bit
  Fiber Distance                   : 11111m
  ONU RX Power                     : - 22.1 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:05:42:57
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 42
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 20 28 98 31 29 a1 92 0a 20 a1 a3 13 20 28 02 83
  OMCC Version                     : 0xa0
  onu-profile                      : PRESET1_630-10B_11_8f9fc1
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 10
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : LOSi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW235c0075
  Serial Number(Hex)               : 46524b57235c0075
  Password (R-ID)                  : 31323334353637380000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:5c:00:75
  EqD / RTD                        : 106885 / 1464718 bit
  Fiber Distance                   : 11467m
  ONU RX Power                     : - 21.9 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:05:43:13
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b0 ba b0 08 29 a1 0a 13 20 a3 a1 33 20 28 02 83
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 11
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : LOSi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW235ca495
  Serial Number(Hex)               : 46524b57235ca495
  Password (R-ID)                  : 31323334353637380000
  Description                      : GENARIO DE JESUS ALCANTARA
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:5c:a4:95
  EqD / RTD                        : 106005 / 1465598 bit
  Fiber Distance                   : 11539m
  ONU RX Power                     : - 27.4 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:05:42:42
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 9b 28 a1 11 29 a1 99 83 02 a1 a1 33 20 28 00 83
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 12
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : LOSi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bf8f7
  Serial Number(Hex)               : 46524b57276bf8f7
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:f8:f7
  EqD / RTD                        : 108460 / 1463143 bit
  Fiber Distance                   : 11338m
  ONU RX Power                     : - 21.7 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:05:43:13
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 94 32 c3 b1 64 42 ed 5d 8a b5 8d 72 cc e3 92 53
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 13
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : LOSi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW236aba87
  Serial Number(Hex)               : 46524b57236aba87
  Password (R-ID)                  : 31323334353637380000
  Description                      : Ricardo Ferreira de Jesus
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:6a:ba:87
  EqD / RTD                        : 106581 / 1465022 bit
  Fiber Distance                   : 11492m
  ONU RX Power                     : - 23.0 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:05:43:12
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b0 a3 22 98 29 a1 0a 13 20 a3 a3 33 20 28 02 83
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 14
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : LOSi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW235c4a45
  Serial Number(Hex)               : 46524b57235c4a45
  Password (R-ID)                  : 31323334353637380000
  Description                      : Maria da Paix�o O. da Silva
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:5c:4a:45
  EqD / RTD                        : 121050 / 1450553 bit
  Fiber Distance                   : 10306m
  ONU RX Power                     : - 21.7 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:05:42:57
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 20 b8 20 83 a1 30 13 13 29 28 b9 98 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 15
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : LOSi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW15368c97
  Serial Number(Hex)               : 46524b5715368c97
  Password (R-ID)                  : 64656661756c74000000
  Description                      : Ronaldo de Jesus Bispo
  Learning Method                  : Manual
  Model Name                       : LD420-10R
  MAC Address                      : b8:26:d4:36:8c:97
  EqD / RTD                        : 109604 / 1461999 bit
  Fiber Distance                   : 11244m
  ONU RX Power                     : - 21.1 dBm
  MAX T-CONT                       : 8
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:05:42:58
  MIB Upload Count                 : 159 / 159
  MIB Sync Number                  : 26
  SysUpTime                        :   2:08:34:17
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0100
  Host Name                        :
  Encryption Key                   : c3 67 54 34 47 6e b5 a2 3c 0a 94 77 34 fb ad df
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT420-10R
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 16
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : LOSi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW23820b1e
  Serial Number(Hex)               : 46524b5723820b1e
  Password (R-ID)                  : 31323334353637380000
  Description                      : ARLINDO FERREIRA APOLINARIO
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:0b:1e
  EqD / RTD                        : 111229 / 1460374 bit
  Fiber Distance                   : 11111m
  ONU RX Power                     : - 21.5 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:05:42:57
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 31
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b0 b8 00 a1 29 a1 92 0a 20 a1 a3 13 20 28 02 83
  OMCC Version                     : 0xa0
  onu-profile                      : PLANO10_630-10B_11_b645e3
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 17
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : LOSi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW238215c6
  Serial Number(Hex)               : 46524b57238215c6
  Password (R-ID)                  : 31323334353637380000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:15:c6
  EqD / RTD                        : 104563 / 1467040 bit
  Fiber Distance                   : 11658m
  ONU RX Power                     : - 20.8 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:11:04:43
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 38
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b9 a1 02 9a 20 28 92 0a 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-ONT630-10B-PRE-SET
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 18
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276b8ae3
  Serial Number(Hex)               : 46524b57276b8ae3
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:8a:e3
  EqD / RTD                        : 104297 / 1467306 bit
  Fiber Distance                   : 11679m
  ONU RX Power                     : - 21.6 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:20:31:58
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 8e b8 e8 ff 65 02 be 96 e5 43 36 ce 45 12 ed 4f
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 19
 ---------------------------------------------------------------
  Activation Status                : Inactive
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Unspecified other
  Serial Number                    : FRKW2382127e
  Serial Number(Hex)               : 46524b572382127e
  Password (R-ID)                  : 00000000000000000000
  Description                      :
  Learning Method                  : Manual
  Model Name                       :
  MAC Address                      : 00:00:00:00:00:00
  EqD / RTD                        : 0 / 1571603 bit
  Fiber Distance                   : 0m
  ONU RX Power                     : - 40.0 dBm
  MAX T-CONT                       : 0
  MAX US Priority Queue per T-CONT : 0 ()
  T-CONT Scheduling Policy         : Null
  Activated Time                   :   0:00:00:00
  MIB Upload Count                 : 0 / 0
  MIB Sync Number                  : 0
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :  12:05:55:11
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  OMCC Version                     : 0x00
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 20
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276b8a83
  Serial Number(Hex)               : 46524b57276b8a83
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:8a:83
  EqD / RTD                        : 103712 / 1467891 bit
  Fiber Distance                   : 11727m
  ONU RX Power                     : - 21.9 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:20:32:59
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : e5 0c d5 c8 60 b4 ad 3b f7 ab 92 3c 14 51 56 85
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 21
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bf90d
  Serial Number(Hex)               : 46524b57276bf90d
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:f9:0d
  EqD / RTD                        : 104906 / 1466697 bit
  Fiber Distance                   : 11629m
  ONU RX Power                     : - 21.3 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:20:33:29
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 3e 5e 6e 67 1d 18 78 79 25 69 93 5c 06 0f 76 d2
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 22
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : SFi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW1176f3a3
  Serial Number(Hex)               : 46524b571176f3a3
  Password (R-ID)                  : 64656661756c74000000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : LD420-10R
  MAC Address                      : b8:26:d4:76:f3:a3
  EqD / RTD                        : 115139 / 1456464 bit
  Fiber Distance                   : 10790m
  ONU RX Power                     : - 23.2 dBm
  MAX T-CONT                       : 8
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:03
  MIB Upload Count                 : 159 / 159
  MIB Sync Number                  : 26
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0100
  Host Name                        :
  Encryption Key                   : 76 f3 9c 32 ee 52 fc 08 0f ce dd 60 31 6e 1c 8c
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT420-10R
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 23
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276b8a9d
  Serial Number(Hex)               : 46524b57276b8a9d
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:8a:9d
  EqD / RTD                        : 102853 / 1468750 bit
  Fiber Distance                   : 11798m
  ONU RX Power                     : - 21.9 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:20:28:59
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 31 8c 5c eb 5a 87 d9 70 e3 a0 fa 3a f4 33 db 88
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 24
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : LOSi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bf8cd
  Serial Number(Hex)               : 46524b57276bf8cd
  Password (R-ID)                  : 31323334353637383930
  Description                      : DAMIAO PEREIRA MATTA MOTA
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:f8:cd
  EqD / RTD                        : 112300 / 1459303 bit
  Fiber Distance                   : 11023m
  ONU RX Power                     : - 21.8 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:05:42:58
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 7a 78 87 b9 3f 6e c7 52 d7 22 06 de 54 18 f0 fa
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 25
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : LOSi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW235f66fd
  Serial Number(Hex)               : 46524b57235f66fd
  Password (R-ID)                  : 31323334353637380000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:5f:66:fd
  EqD / RTD                        : 112317 / 1459286 bit
  Fiber Distance                   : 11022m
  ONU RX Power                     : - 21.1 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:05:42:43
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 29 b8 22 83 b9 b8 92 9a 29 b8 2b 81 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 26
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : LOSi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bf8eb
  Serial Number(Hex)               : 46524b57276bf8eb
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:f8:eb
  EqD / RTD                        : 111919 / 1459684 bit
  Fiber Distance                   : 11054m
  ONU RX Power                     : - 21.1 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:05:43:04
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : fd fc b1 52 db 75 1f 64 37 69 be 97 c5 0c 6c 59
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 27
 ---------------------------------------------------------------
  Activation Status                : Inactive
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW2782b196
  Serial Number(Hex)               : 46524b572782b196
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:82:b1:96
  EqD / RTD                        : 103565 / 1468038 bit
  Fiber Distance                   : 11739m
  ONU RX Power                     : - 40.0 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:00:00:00
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   2:18:31:39
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : d9 ef a7 01 1e e6 6c 59 c7 3c ca b5 0f ed 8e e8
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 28
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : LOSi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW235c4a4d
  Serial Number(Hex)               : 46524b57235c4a4d
  Password (R-ID)                  : 31323334353637380000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:5c:4a:4d
  EqD / RTD                        : 121391 / 1450212 bit
  Fiber Distance                   : 10278m
  ONU RX Power                     : - 28.8 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:05:42:58
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b0 28 b9 98 b0 a1 02 0a a1 31 b9 ba 20 28 0b 83
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 29
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bf903
  Serial Number(Hex)               : 46524b57276bf903
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:f9:03
  EqD / RTD                        : 104236 / 1467367 bit
  Fiber Distance                   : 11684m
  ONU RX Power                     : - 21.1 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:20:12:43
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 1f eb a4 f6 b6 2d 0e 45 40 ce 1d fb b1 e8 0e 27
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 30
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276b8b15
  Serial Number(Hex)               : 46524b57276b8b15
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:8b:15
  EqD / RTD                        : 103165 / 1468438 bit
  Fiber Distance                   : 11772m
  ONU RX Power                     : - 21.6 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:20:33:28
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 36 15 b2 74 b9 38 70 57 e8 1d aa ce 32 09 c0 c0
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 31
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW235c4a79
  Serial Number(Hex)               : 46524b57235c4a79
  Password (R-ID)                  : 31323334353637380000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:5c:4a:79
  EqD / RTD                        : 121195 / 1450408 bit
  Fiber Distance                   : 10294m
  ONU RX Power                     : - 23.3 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:03:58:43
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b0 28 02 9a 20 28 0b 9a 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 32
 ---------------------------------------------------------------
  Activation Status                : Inactive
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW2782b750
  Serial Number(Hex)               : 46524b572782b750
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:82:b7:50
  EqD / RTD                        : 107452 / 1464151 bit
  Fiber Distance                   : 11421m
  ONU RX Power                     : - 40.0 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:00:00:00
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 37
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   2:08:16:23
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 2f a9 7e 5c d0 a1 ef 63 8d 15 2c 46 75 2d ec 56
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-ONT640-10B-PRE-SET
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 33
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW27828f6c
  Serial Number(Hex)               : 46524b5727828f6c
  Password (R-ID)                  : 31323334353637383930
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:82:8f:6c
  EqD / RTD                        : 118994 / 1452609 bit
  Fiber Distance                   : 10474m
  ONU RX Power                     : - 21.0 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   4:02:21:30
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 6a b4 ec 1d c0 d4 72 91 c8 ba 2e 37 8a 78 fc e9
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 34
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW27828f64
  Serial Number(Hex)               : 46524b5727828f64
  Password (R-ID)                  : 31323334353637383930
  Description                      : Marcia Souza Teles
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:82:8f:64
  EqD / RTD                        : 119038 / 1452565 bit
  Fiber Distance                   : 10471m
  ONU RX Power                     : - 21.9 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:05:41:58
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 37
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : dd 2a 15 86 a6 ac 6f 82 ed de 3a b1 f8 8a 05 d8
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-ONT640-10B-PRE-SET
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 35
 ---------------------------------------------------------------
  Activation Status                : Inactive
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Unspecified other
  Serial Number                    : FRKW27828f86
  Serial Number(Hex)               : 46524b5727828f86
  Password (R-ID)                  : 00000000000000000000
  Description                      : LUCIANE ALMEIDA DE JESUS
  Learning Method                  : Manual
  Model Name                       :
  MAC Address                      : 00:00:00:00:00:00
  EqD / RTD                        : 0 / 1571603 bit
  Fiber Distance                   : 0m
  ONU RX Power                     : - 40.0 dBm
  MAX T-CONT                       : 0
  MAX US Priority Queue per T-CONT : 0 ()
  T-CONT Scheduling Policy         : Null
  Activated Time                   :   0:00:00:00
  MIB Upload Count                 : 0 / 0
  MIB Sync Number                  : 0
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :  12:05:55:11
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  OMCC Version                     : 0x00
  onu-profile                      : PRO-ONT640-10B-PRE-SET
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 36
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW235f6747
  Serial Number(Hex)               : 46524b57235f6747
  Password (R-ID)                  : 31323334353637380000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:5f:67:47
  EqD / RTD                        : 117295 / 1454308 bit
  Fiber Distance                   : 10614m
  ONU RX Power                     : - 22.0 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  11:02:48:48
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b9 a0 13 13 20 28 0b 0a 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 37
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bb5d5
  Serial Number(Hex)               : 46524b57276bb5d5
  Password (R-ID)                  : 31323334353637383930
  Description                      : ANTONIO BISPO DA CRUZ
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:b5:d5
  EqD / RTD                        : 117641 / 1453962 bit
  Fiber Distance                   : 10585m
  ONU RX Power                     : - 19.9 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:46
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 37
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 7a 9b 02 65 8b ff 29 18 42 60 0d 2a 0c 62 8e 84
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-ONT640-10B-PRE-SET
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 38
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : -
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bb63d
  Serial Number(Hex)               : 46524b57276bb63d
  Password (R-ID)                  : 31323334353637383930
  Description                      : TRANS-GD-VL-866
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:b6:3d
  EqD / RTD                        : 117351 / 1454252 bit
  Fiber Distance                   : 10609m
  ONU RX Power                     : - 21.1 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   8:21:51:17
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 27
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 33 76 75 31 83 a4 65 8f 80 ee 91 ee e1 d2 c6 bd
  OMCC Version                     : 0xa0
  onu-profile                      : OP-GD-AVANZA-GD_VL866-ONT640-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 39
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : DGi (Power off)
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW276bb60d
  Serial Number(Hex)               : 46524b57276bb60d
  Password (R-ID)                  : 31323334353637383930
  Description                      : VALDETE GOMES DA SILVA COSTA
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:6b:b6:0d
  EqD / RTD                        : 119833 / 1451770 bit
  Fiber Distance                   : 10406m
  ONU RX Power                     : - 20.4 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   3:20:26:00
  MIB Upload Count                 : 381 / 381
  MIB Sync Number                  : 37
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : fa a4 2f 8d 31 bb 5a f9 c3 f0 3b 38 7e 98 1d c7
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-ONT640-10B-PRE-SET
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 40
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : LOSi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW2783023a
  Serial Number(Hex)               : 46524b572783023a
  Password (R-ID)                  : 31323334353637383930
  Description                      : DANILO DE JESUS ALVES
  Learning Method                  : Manual
  Model Name                       : 640-10B
  MAC Address                      : b8:26:d4:83:02:3a
  EqD / RTD                        : 108884 / 1462719 bit
  Fiber Distance                   : 11303m
  ONU RX Power                     : - 24.4 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:05:42:43
  MIB Upload Count                 : 378 / 378
  MIB Sync Number                  : 37
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x6763
  Host Name                        :
  Encryption Key                   : 30 b9 45 0c d7 9f 81 ef 3e a7 ad 16 e4 87 6d 4b
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-ONT640-10B-PRE-SET
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 41
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : LOSi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW235c7489
  Serial Number(Hex)               : 46524b57235c7489
  Password (R-ID)                  : 31323334353637380000
  Description                      :
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:5c:74:89
  EqD / RTD                        : 111142 / 1460461 bit
  Fiber Distance                   : 11118m
  ONU RX Power                     : - 23.3 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:05:42:43
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 29 28 90 2a 29 a1 9b 9a 20 a1 81 31 20 28 02 83
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 42
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : LOSi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW23821016
  Serial Number(Hex)               : 46524b5723821016
  Password (R-ID)                  : 31323334353637380000
  Description                      : LUCIANA DE ALMEIDA CORREIA
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:10:16
  EqD / RTD                        : 108680 / 1462923 bit
  Fiber Distance                   : 11320m
  ONU RX Power                     : - 19.9 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :   0:05:43:13
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 28
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : b0 89 13 13 29 a1 02 9a 20 81 83 11 20 28 02 83
  OMCC Version                     : 0xa0
  onu-profile                      : PRO-BL50M-ONT630-10B
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Support
  Remote Debug Format              : ASCII
  us-fec-mode                      : Disable
 ---------------------------------------------------------------
  OLT : 8, ONU : 43
 ---------------------------------------------------------------
  Activation Status                : Active
  Last Activation Fail Reason      : -
  Deactivation Reason              : SFi
  Latest Restart Reason            : Not support
  Serial Number                    : FRKW2382038c
  Serial Number(Hex)               : 46524b572382038c
  Password (R-ID)                  : 31323334353637380000
  Description                      : ADINAILSON SOUZA DOS SANTOS
  Learning Method                  : Manual
  Model Name                       : 630-10B
  MAC Address                      : b8:26:d4:82:03:8c
  EqD / RTD                        : 117620 / 1453983 bit
  Fiber Distance                   : 10587m
  ONU RX Power                     : - 20.0 dBm
  MAX T-CONT                       : 15
  MAX US Priority Queue per T-CONT : 8 (8/8/8/8/8/8/8/8/)
  T-CONT Scheduling Policy         : SPQ
  Activated Time                   :  12:05:54:03
  MIB Upload Count                 : 363 / 363
  MIB Sync Number                  : 42
  SysUpTime                        :   0:00:00:00
  InactiveTime                     :   0:00:00:00
  Vendor Product Code              : 0x0000
  Host Name                        :
  Encryption Key                   : 28 31 92 0a 28 31 02 0a 20 28 02 08 20 28 02 0a
  OMCC Version                     : 0xa0
  onu-profile                      : PRESET1_630-10B_11_8f9fc1
  VoIP Available signal protocol   : None, VoIP not supported
  VoIP Available config method     : -
  Power over Ethernet Control      : Not support
  Remote Debug                     : Not support
  us-fec-mode                      : Disable`;

  const regexp = /----------------------------------------------------------------\n OLT : \d+, ONU : \d+\n----------------------------------------------------------------/gmi;
  /*
  const cmd = `show onu detail-info ${port}`  
  // const chunk = await conn.exec(cmd)
  */

  const splitted = chunk.split(regexp)
  splitted.shift();
  const data = splitted
    .map(item => column2json(
      item
      .split('\n')
      .map(item2 => 
        item2
          .replace(':', '[$%]')
          .replace(/\:/gi, '-')
          .replace('[$%]', ':')
        )
      .splice(1))
    )
  return data.map((item, ont_id) => ({
    board,
    slot,
    port,
    ont_id: (ont_id + 1).toString(),
    // pon_type: 'gpon',
    // capability: 'bridging_routing',
    // allow_custom_profiles: false,
    // catv: false,
    temperature: 0,
    tx_power: 0,
    olt_rx_power: 0,
    catv_rx_power: 0,
    onu_type: item.model_name,
    name: item.name,
    rx_power: parseFloat((item.o_n_u_r_x_pover || '').toLowerCase().replace('dbm', '').trim().replace(/ /gi, ''), 10),
    onu_external_id: item.host_name,
    serial_number: item.serial_number,
    mac_address: (item.m_a_c_address || '').replace(/\-/gi, ':'),
    description: item.description,
    distance: parseInt((item.fiber_distance || '').replace('m', ''), 10),
    // Inactive
    stage: item.activation_status === 'Active' ? 'online' : 'disabled',
    authorization_at: new Date(), // TODO colocar uma tag de origem importada
    uptime_at: day2time(item.activated_time),
    custom_fields: {
      source: 'import_onu'
    }
  }));
}

module.exports = displayOnus