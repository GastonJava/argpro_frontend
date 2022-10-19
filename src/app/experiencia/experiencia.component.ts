import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EsadminService } from '../share/services/esadmin.service';
import { LocalstorageService } from '../share/services/localstorage.service';
import { SobremilocalstorageService } from '../sobremi/SobremiServices/sobremilocalstorage.service';
import { ExperienciacardModel } from './ExperienciacardModel';
import { ExperienciaService } from './servicios/experiencia.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.scss']
})
export class ExperienciaComponent implements OnInit {

  imagencard_SOLO_SIN_data_imagejpg_base64: any = "";

  /*
  imagencard_SOLO_BYTEARRAY_SIN_TEXT: any = 
  "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";

  imagencard_SOLO_BASE64_CODED: any =
  "LzlqLzRBQVFTa1pKUmdBQkFRQUFBUUFCQUFELzJ3Q0VBQW9IQ0JVVkZSZ1ZGUllZR0JnWkdCZ1lHUmtZR0JnWUdCZ1lHQmdaR1JvWUdSZ2NJeTRsSEI0cklSZ1pKamdtS3k4eE5UVTFHaVE3UURzMVB5NDBOVEVCREF3TUR3OFBHQkVSR0RFaEdCMDBORFF4TVRRL05ERTBNVFEvTVRZeE1URTBOREV4UHpRME1UOHhNVDgwTVRFME5ERXhNVEV4TVRFME1URS9QelEwTWYvQUFCRUlBTGNCRXdNQklnQUNFUUVERVFIL3hBQWJBQUFDQXdFQkFRQUFBQUFBQUFBQUFBQURCQUFDQlFFR0IvL0VBRHNRQUFJQkF3SUVBd1VHQlFRQ0F3QUFBQUVDRVFBRElSSXhCRUZSWVNKeGtRVVRNb0doQmhSU3NkSHdRbUxCNGZFamNvS1NvcklrWkhQL3hBQVlBUUVCQVFFQkFBQUFBQUFBQUFBQUFBQUFBUUlFQS8vRUFCMFJBUUVBQWdJREFRQUFBQUFBQUFBQUFBQUJBaEV4UVNFeWNRUC8yZ0FNQXdFQUFoRURFUUEvQVBrMVdBcUN1Z1VWQUs3RmRBcXdGQndDdWdWY0N1aGFEZ0ZkQXF3V3JoYUFlbXVoYUlGcTZwUURDMWJSUlZTcmhLQU9tdUZLWUNWM1JRQkNWM1JSd2xXRnVnWDBWTkZNNks3b29GUGQxTkZOYUs1N3VnVUtWRldtV1NxYUtBRUhhcUZLYlczWFRieFFKYWFxVnBrMjZxVW9GeXRjSzBjclZTdEF1UlZTS01VcmhXZ0RwcmhGRklxcEZBSWl1RVVRclZTdEJXS2xXaXBRY0FxNEZRQ3JnVUhBS3VCWFZGWEMwRlF0WEMxWlZxNFNncXExY0pSRlNpS2xBSVc2c3FVZFVxNjI2QVNwVndsTXJib2kycUJUM2RXRnVuQlpvaTJhQkJiWEtpQzNUdnVLdUxGRkllNnF3dFZvRGg2Nzkzb00zM1ZjTnF0VDNGVlBEMEdVYlZWOXpXbzNEMVEyS0RPQ1JVUGxUeHNVSnJORVo3VzZxeVZvRzFRM3MwQ0RKUTJ0MCsxdWhOYm9FbVNobEtlWktFeVVDWldxNmFhS1ZVcFFMRVZRaW1HV3FGYUFNVktKcHFVRlFLdUJVVVVWUlFjVmFLcTFGV2lxbEJ4VW9xcFZrU2lvbEJWVW9xVzZLaVVaTGRBSkxkRUZxbVV0MGRMVkFxbHFtRnMwMHRtbWtzVVVnbkQwZE9IclFUaHFPbkRVR1l2RFVSZUZyVlhoYU1uQzBHTU9FcTQ0V3RnMkFva3dBTnljQWVacFc1eFNBS1FDVmNrSTdFSmJjaVFkTEhMYkhZSGFnUys2MVE4TFhvZUY0VU9kQ3RiMWtTbzk0R0I1WktnZ0daaGZyUjczc1M0ZzNSeU53amMrZ0J6UGFwc2VXUENVTnVGclpWbDFNamdveTdod1Z3UklNbkF4eU1IdFJuNFR0VkhtbTRhaE53OWVpZmc2Qy9DMEhuMjRlZ1BZcjBMOExTNzhMUVlMV0tDOW10dCtIcFY3RkJqdGJvVFc2MVhzVUI3VkVaYlc2b3lWb1Bib0xKUUlNbFVaYWNaS0U2VUN1aXBSOUZTZ1hVVVZWcWlpaXJRRVFVUlZxcUNqSXRBUkZvcXJYRVdqb3RCZEVwcExkVXRyVGR0YUs3YnQwMWJzMTIwbE4ya29PVzdOTlc3RkV0cFRTSlFDdDJLWlRoNkxhU25FU2dXU3hVNGxrdG96dVlWUm5xWndBQnpKSkFBNzFvcGJyelB0VmZ2UEUrNjFzcVd1UWFOYjRMa0Fad0NGbmNTWWlab01UaWIxM2laMU5wVS9BZ2tLQWNTNWp4ZlBFNEVUVENjSTdhVTVCUjRSNzAyNTZrZ3dHTThpTjlvcmV2OEFzbGZkNldkbFhTZFJXRVk2UnErSlNOSWhUZ2ZyTFBBOElpb2dUU2lGVXhxY0JFaVJvQUVsaUozSU04OFZCa0p3VG9BUXhMQmkrR1lTNUEyamJiNjEyNGw5cElKWFVwVTZ0TEh4VGtObUd6a2plZDY5QWJWdENHTHNRd2hGTEFyeStHY2s3Y3p6am5WdUw5bHE2NlpaY2doa2JTeXNwMUJsNVRJNloyT0tLOGhlUjFaeWdRM1dUUWRpK2dpR2tNZFRxWVdjeGdWMzJmN1dGcDlEc1RhWmdxc3h5alFOUTNJMEFrWUprQXpFU0I2aGZab1ZBRG1GVlowbWZEQUJBNVpBTlkvdEwyZXBGeFVVS1FpekFnTXAwblVJeHAzd00rQTlxSTFuNGN6amJuUW40YWcvWlBpQ3lOWWVkVnJDa3o0clpKMG5QU0NQTFRXMjFtcU1OK0ZwVitHcmVlMVMxeXpRWUZ6aHFVdWNQVy9jdFVwZHMwSG43bGlsTGxtdCs3WnBPNVpvTVI3VkxQYnJZZTNTbHkzUVpqcFFIdDFvdWxMdWxFSmFLbE1hYWxCbExSVW9TMFZEUUhTanBTNkdtRU5Bd2xNSlNxR21rTkZOV3hUZHNVbmJhbTdiVURsb1UvYUZaOXBxZXRQUU8yeFRkc1VsYmVtck4wSGJsUU9vS2FRVXBiYW1VYWdNOXdJck9kbFVzZkpSSi9Ldk1ld2VGVkhTODdFM2JxT294SW1mZTNOSUF3VzNKSi9nRVZ1ZTF6LzhhLzhBL2pjLzlHckw0RGkvZDJoY2NrZ0prQWZDVVYyWnV3SUFIeUZRalJaRXYyaWoyMlpJMVFkY01GWWdUc1dERE9uWWd4VmVJZTVkVkFwOTI3TXdVbE5SMEVNQ1dRa1JpR3lRUks5ZE5PMnVJa3hCQmdFekdKNUh2K2hyaHRLek9yRStNQWdUQUk1alNjTkJFL1B6a3NGdGxiU0paU1NWUUtDU0N4Z2ZFdzU1RWs5Nm5CUGNLdnJYUzhlQkhaQzBoUmtsQ1FBVytnb3Fob0VQL3dCaHE5SWo2elEzUTY5V3BpUU5sZ0tlbTRKR0Njek9hRWR0Nm5SZGFrTWRRWmNCbGs0T0RHd0cwOWFHOXFJQkpIaUE4TUFGc3NXS2dZRFptZnpxOXNrT1luUkNxSmtuV0pMa2tuSWdxQWY1V3F4WEExSFZHeFBUSHkzRkN6VllObXo3dmlyVHdScjFvMHRPSDhRWHVBeXJYcEhXc0gyZ1lheUprbS9hL3dEY0ZqK2RiekdpQU90THV0TXRRR29GTGlVbmNTbjdsS1BWQ0YxS1N1cFdqZHBPNEtET3VwU1Z4SzBib3BLNEtCQjFwWjFwMXhGTDNCUUthSzdSSXFVUjUxVFJFTkFWcUtyVURDbWpvMUpxOUdSNkJ4V3BoR3BGR3BoSG9IMGVtcmIxbUs5Tlczb3JVdFBUdHQ2eDB1eFRJdndKQW50UWJWcDZhc1BrRHJQbGlzWkw1SmdjdWZLdEMzY2plZzFyZHlta2VzdXpkbW1yVnlnZktobEtuWmdRZklpRFhsL1kxNHFyVzJNT2hLTkU1Z2xTUXZQYzllVmVpUjY4MzlvT0hObTZ2RUtQQThJKy9oY0R3dDVFQ1BOZTlGYk41SlM0b0xlSldPb0VrZ25jQUNTT1JBRTc5YVkrOGFpa01yZ0ZTY2tHV0JLc09SQklnSHo3eG1jRnhZS3dHTWdiNG1ldVJFODlxMFVQaEM0bUFOUUViYlJCeHZ0UFdvQmUyUGExNnc0MEpiWkNqdEx1NGJVaU03WUNrUkNyNWtuYXRMaHVJY0lIdWFaZ3N3U2RNWklJMVoyMDQ4Njg1OW9iMGl5MzRsdnhIUFZ3N2tRZXUxYlZtNk5GdFFJRUpPMEJVQU9JeEVoUjVHZ2ZzbGdvQjMzYi9jVExmS1NmbFMvRVhOQzd3QWVXWjZBYzk0SFdydGU3VmwrMCtQQ0tTWXdPdEJSSE56aTdhRGEyR3VOOGhvVWY5bUIvNG12UnMxWW4yYjRVb2h1dUllNlE1SE5VQThDOXNFdC95N1ZxTWVkRWNkcUM3VjFucFYzZ3hOQnk4NWd4bWs3bHpsdlY3bDhESE9sYjE4Q2dFOTVacFptcVBjeU1ZL2ZPZ1hibmVnRmRZR2xialZIYnY2VUM4L1NxQjNUMHBaelZuZWFDNzBISnFVUFZVb1BNcTFYVjZGRldpaUdCY29pM0tXV2lLS0JwTGxFUzRhV1VVU0RRUEpjb2lYNDUwbHc0bnFLWlMzeTU4NkJ4T0lQV25MVnp6cEcwbE1vaG5mYWl0R3pjeUtkUjUyckx0OWpUbHNuZWNUbit0QnFjUGMzeDg2Y3R0V1loTk5XMm9OVzAwVVMvWVc0akk0SlZoQjY5aUQxQmdqdUJTSWFSQjUvdmVta2N3UEllZ29QTmNDNzJuTmwvaVZva2JFZkVHZzhpTzhpZk9QUmNNMGlCMTVnOXlOdmx2MXJKOXZxQmVzdU4yRElmK01NdjV2V2h3ZHdrblNRUURERG1wZzhvbWR2TU1EeWt3WW50UGoxdWhWdEt6RzIzRWFzRlFvMFBiVlFUejhROUsydllmSHBka0xxbEVSV0RBalNUcW1PVzY3WXdGeHRYbTdEWEVkd29ESmNlKzRPcExlanh0QkR1MmwxR0pHUG9aMHZzeVhXOWNadEhqVU81QWlXOEl0aEJNYVlOeWU4UWFOUFQzY0QrOVlIdVB2SEVCRGxFaDduODM0VVBtUjZCcTJycnFWTUVIZll6MS9RMGg5blVBUzQvTjdyNTdLQW9IcUc5YU0xdjNMbEFlNE90Y0pOQmR1VkZXZCs5TFhYcU93aWxIdUg1VVJXK3dwTzhjOXF2Y2VhVU4vTzJPdEFLNHg1OSsxSnU4Q2pYWG52U3JuQkZVQ2NRVEd3NWlnUGN4WFhZODZCY2NpZzQ3MEZucnJ0M21sM2VpTzZqMXFVSFZVb01aZk9yb0JTd05YRkVNb28vV2lnWnBWRFYwb3B0QU9sR1FEWVVrb29pcjN6UWFLQUNpcGpuU1NyRy9MbDA4NktveHp3SmpzZHoyb0gwSTJuK25wVEt2M3BDMkIrbnpwaElIZnl6dlJXbFpmSG1CQnBpMC9YYkZaeXAzbk1TTWp5cHRGeWVtNDVEYi9GQm8yM3B0Q1R0U0ZwOGdEWS9rUDZVMmh4Sm5mOEFLZ2VRL3ZvYVpSVDE3VXRaZm1lbXd5Si94VFZwZ2VmK09WQmxmYU1FSmJlSkNPTlhaV0JXZisybjFvdG5pbElCZHd1eEIxYWVtTjl4REE3Z2d6V25mUU9qb0lsbFpSSUJFa0dDUjBtdmgvRThlN0VobHlDUXdETUlJd2NFbUtsVjd2ZzNiM2RsTXpvdkFpTWpVaG5FVFd4d0xEM3lzV0NuM0dnZ3hBYVZJZ0U3Z3IrOTYrV3A3UmNzVEJrOHlaT2U1RTA3ZmJTbXVUbitIWGpNNWdqY1RnOG9CM3JOdmw2WTQzS1hYVDZ6eFhHNkVaeVJBSFNKaWQvclZ2WWRoMXRLWEJCY3M1SE1hMkpBSTVHQ0pyNXo5aEhOM2kwVXhwQ3N6aG1KMUJWOElFbnhIVVZPQnNwNVY5WVpwenErVmFlVkRMZDgwdTdRYU83QW5jZWgvT2x1SUlIT2ZLZ0hjdWZsU2wyNVJuTktYRzlaL3JRQmQrWDVVcGNKanA1VWE4Mi9MYjFwVzR3MnFnRnpCR1lqbFFIdWRxdmNhbDMyL3AxRTcwRlhmQXBhNGVmMHE3a2VkQlpwSjZDZ0MrTWV0QXVIT0tPN0Fuci9BSG9MZVZFQ2sxS3JOU2d4eFZ3ZVZVVUh6cXlIOXpqMW9naU5qbDUxYnlxaUQvRUg4NnVCMS9KcUFxR1k4dHY2MFMzMDlQM3lvT29SQWo5OXFJb3hHNW5mSDViMFV6YjJuOW1pcThjakJnWWpyc2MwQkdJWWRBVHNQcUFhWlZ3MlFESFFqNjcwREJPZzVNeEovbEo2ZVVVelp6RERNZzdaSTZ5QnRTdHBvTW1SdU15VXo2aWkyQkoxb0ZrWTVSSjVZb0cwY1JPTW5mdHpCam5tbStHTW5ja0VUTUVxRkVqa01ERy9hbFBka2pBSW5MS3BqVVl6eUlBeDNwbmdreExmR3l4R2x0QmpFTVFmRHlPSUdLS2V0S1NReEVjMVB4QmwyZ0grMU8yNXdRWkIvaHhKUFBmZisxWlZuaUYxcUE0bFNZeUJKajRmRmpCNnp1TnFPa3FISkV2Z2VFUVpPQkN0RTVIV0tEWTRmaUJHK1FKSy93QVN6c0NCSjllbE0yN2tLQzBFejRwRUNlVlk0ZHcya0pFTGxwYnhFQ0pHbkV6bUppajIrTmM2a0ExSFRPbWZHUDhBZEtpQm5lT1ZCdEpKTWd4Nlo2VjhMOXBLdnZyZ1ZpNis4ZUdZQlMzaU9Tdkw5N1Y5ZlhpdEpqbU5Ld0hWVEpud2hTY25CSUozQWtWOGw5dUVuaUx4Wmk1OTQwc3cwazUvRHk2ZktvRitHdHovQUFNM3pqK2xhVjlJUUhRdSt4QnhqbVFvbjVrMWwyRUJQd3Mza1lyUjRxMy9BS1k4QUdlcWs3Y3lBVDlheGx6SFIrUHJsOGF2MkNZL2ZGSVZXSVIraTZNQWEwQTNiT21PakUxOVJETkVSMzIrUXI1WDloZ1Y0bFhLYWxWWDhXUUVMS1FIQjJKT1ZqK1ltTVRYMGc4ZUpJVU5KSXhwbWVXVGdBZ2tDSzI1Nk85d3ppYVVlLzhBdU5qKytkUitQVm9EQWtRQUFScGJJSnlmbFFINDFKREtEQUVud3dlc1FUSUEzbWdsemlOeDhoMWpHUUtYdlBuZmw4d2Q4aXUzWFhCQXhrWmtSSFdPVzNhZ05wSmxmaElCNTRuQU1jaCt0Qnhua2tHUmt4dG5uei96U3BlWUN4dkcrKzlXdkpsMjhic05YVUFJdVpnWWtDVGdiU2FDV09uRVFZQlBQcktrWkVoVG45YW80enoxNitZRVo4cVd1UHpVZ3FBTW5mdm5wVmk4VElJL1A1ZldsSGR0emlUUGhFa2RNZEtDN2pIZlRNOHZsUzdzSTZFZ2RvNjFSM25iSFBPWWo5YUZjdUNKTzg3azc0aUkvU2lMWE1ISnhBOUlvYkViem5wMzg2b2JuenhBbnAyNlJRbXVIdUFZN2Q2QzJwZXYvalVvTFA1VktET1JjWXFCQ0RqOGpYRjFmaDlEWFRlTzBEYmNNUFRORUUxeWNnajVZL0xGRXlzZzU4aE5Mb3JISTFlcTB3bkQzR0pnT3hpVEFEeC91SU9QblFjUlFkcGtjaXBBR2U1azQ1VTJVWWlJbkVqYkI2QXlZMm9KazhnTnY0VFBjeVBuUmJOMkZnRkdKL2lZdklIUURXRjcvRFFNV0xWeGxMS3VwVk1NNEpaUWRvTEFFRGJhYWoyby9oSmtTVE1FZHdaMjJxbzFRWklJSEpNTnkrRXpIT3JwYUpRa0ZrT0lMd0l6MjY1NWNxS0x3bDBrakcyK2txWjh3TWp6cGg3eERTQTZmOEdmNmdBMEd6ckFJSzIzTVRCSGlqVnBrejhQekhQNTFPRGJKZ0xqWWExbnkvamsrWW9OTGdMcGthdExjc3BkVWVvT0tLN0hXVjBrdDBWZ0RBN0Z3YVNkcmdTQW9rUjRkSkdCdjRsSUVqcEUwNXduR295blMxc09OMGNBbjVBdUNEUlQxbHpvMlpnWkJFcnFCNUhYcmIwa1V5a01zQmJrUm5KWFRuOFJZZm1heXRFeE50OGsrSzArZ0RwcUdzZm5XaWlsUUVmM3pBaVpMSTRqczJ2NWIwRDNDcVYyZHlzWVZqcTBtSW1TVCtkV0xGQ0RxWmdZOFBobnpCWWlsZUY0Z29mQUw1V04xOTVjbnFOSVpoOVpwNnp4TmxzQjNWdnd1Z1ZwNkZDZFkvNjFBZEhZZU9TVkkyWlpqK1pZUDYxNHI3ZDhKYlArckRJOFFXaWJkeUpnQWdTRzVBbmw2ajFvQVVrb2tObWRJaG03R0RrVjU3N1g4WlBEc0d0M0FDQUNHQWdQdUdEQS9DQ0J2bWcrY3JkamthNjEwbmtmblEwYWpXTkpNTmdkUkUvWEZMRmx1dVgwdjdGdmJQRHFEYUNOK05DeERuT1hZd05VejRWSmpHQlcvY3NxWkVZTytTREU0OGhHcjArZFpQMmV1S3RsRVFGVTA0R29IYzZpekVFZ2ttY3IxN1JXbGNGeEZEdXVsSUpKOE1UdUlkMlVBbmJtUDZCUitIVUVEck9BTldNYmpZUkI2ODZxMXRCR254TURCM2lZNWpTZS93QzhVT3p4aU9STEpyakNsN1RrRDhUSXJzRElpdSs1MGlBU2NubWRqaVBFU1l5Y1RSRTBCVlpwSXdaS3F6TkEyK0h0aWVWSThXNnFES3VvWCtSaUZ6aWRFZ0RiSjN4MnB1N3FBMHEybFFTd0FVU3JFUVdVeEEzMkErV0t6YmlFNmRLc1FDR1ptVlBHVGd5dklnYndBQ0kzb0J2eGl4ckFjaUFmQWptT1FKT25BaFNNMEM1ZEIxQkZKTFpMekpWWnpBT1I4eFRWNWswdXBjcWtTeXE0VUdERXVzam13RytNYjBrVlIwQXdGQWorRmhqdkJ4dDBvSmVZWXlUbmFPMlQ1NWlUMXBPNityS1lFZ0VIZjFpS2J1OFBNYVpLaGQxRWprWklIY256elN3Q1MwRWt4a2tFQStRT2FxRjNPQXk0RXdWL1hlYVdLS0dMUUpidkVUbnlBbzdTR1VMSTFjL0VkaEVRVEgxMjZVczdnc1NSa1NEeVdUL0ZwVS9TS0RqTjJ6aWNIMWswTW5FVFBXTisweFZ5Q3VKbVFZZ2FqQXdjREkrWTlhQ3dHd21ESCs0K1lQYWdwcjgvcCtsY3FrUitIMS90VW9GUzU1Zy9JL3BYVXVqWUZnT2svUTExcmlzWkVJTm9Hb0FZZzh5ZXMrWm9KVWZqSDFvaDYzY1FmM05Hc1h3RmpXZmlZNmRSSzVBbGhtSk1BR0IvQ08xSWNNVHFIaVFaR1dFZ1ozSWd6NVJUSEhYQjd3bFd0M0pJOFNwcERFZ1RDUmpKSUFnSHNOZ0dnUnNTTjVQbnlIeTNwUTI3WlB3d1J2QUsrZjc3MG1MaFU2U0NwSEl5Q1BrZHF1dDN2UldtaUlRQnBUQWdlRlozM0ppU2ZPbmx0YTVYVENnUW9UVm54YnNSQkdDY0NlVTg2eDdBVnBKTGdMQllvbXFBU0JrOHBKZ0U4elJSY0d1TEZ4d1p3cmxTWTd2Q2pyeUZCcFd3Vkh4U1QrTE9PeEpKbW5MVEh5TWNqSWs0TUhCNWRPZ3pXSGI5cHZIaVZpRHowRUE4dVdLZSsvdXBoN0xpQnFJME1JVWdIVVJHQkFCNlJGQTNaNDVOZ2ZpTzBOTE5tSkhNNUkybXJmZWVIY2FDOW84dExZajVFVWh3UEVXeTMrbUxpazdoWGdIelZzZDYwRjRWWGRrYzY5S3F4eWtqVVZBMWFCS2lHM21aZ2M2QmpoL1pRTUMyVU9aSGd0TjZSRGVwcHk4bCsyMmtDMFlIaURvUXdQTXJwT1BMNjBsYTRHMkdDQkVLRUh4UkxhaVBDUnFoaU1iU0lMZG9weTNiZkNpUXBpY3dxeHowbnNlWFNpaFd1TGExYzk0M0MyM09ScnRzeGFPNnNBU2ZXdFIvYnFQaGJGOUR1WVFya1R6MXFQbG1rL3VselVDcGtNVkIxTmJHZ0E1SUdabm5rOXFiKzZYZVMvTlNqRWZMSTZjcUNxOGNrUzFoN2pIWmJnUkVKQTNJVXVUeXpGZVQrMG9ONCs4dWxFa3hwVnl5Z2phRlpsNWRCUG5Yci91anNBTHFKb0FKWnlVdE1BQk10QUt1UCtJT0s4SmY5cHBkWVdrVHdhanAxTjRUMFlMcEVTQnQ4cWd3TFZobWJTaWxpZGdvSko4Z0JOV05xQ1F3S2tZSVlHWkhJNHdmT3ZTV2VFQ1RweE9jWTUvVC9GTUtpcDRsZEZaZ3lrc3Fhb01TVHEya1RrR2Q5dVlrUGZaTzJkSUNJV083ZTd1MlQybU5ZWlRITWlhOUxkNE5BZFRxK3RkaGRkM0VSSklKWXFBQWVjVmhlenZaZ1paV3hiY1k4UzJVK2pLcGp6blBhbkwzczlHNWFScDJ0czl2eEFjd3JaQlBvT3RGYUNXYnVwa1ZnaFlBQ1d1Z0JSSkpIK3FFV1FSSGhHM09zKzFhZTQyZ1hybHpUZzZMMTFneEJ6bUluc0tKWnRhRWhQOEFUYkFCUXJJNnk3SVR5RzJmT3IvZDMrSm1adFlnNjRQSWlWZVBydjBJb2l2RTNOQTBPdDBML0k3c2YrY2FXK2hwTGhyaUdXWFdWRTVOeHl1T3VzZ0RBNjlhWTRwNytxVVVBYlF0M1NTT1VuM2ZMejlhVHRXYnBadGJYSWIvQU93N2FmOEFhb1VUOHhRY2E0SFJ0Sk9DTW54Z2NqOEIvcjBtYXFFQ1plNXBYdW8rUUFSWjlhSmI0WUNITE93YkExeEU3eDhJekVZTlg0aTB5aFlsOVFFRzJwZU9jRUFZUFk5S0RGNG5qVkxza2trblJEZ0Z3QnNWWFZLblByeXhGQXYyMFNkTG5XU01PWXhHNGZHZDhSODZmNHhyaWVObEtXNUdsbjRhNkZibkdwaUZiMXBMaDc2Q1daMWtqOFpLNUhKUXphU09kRUV0RmRRVXkwOHhCTTh3T1J4SE9sd21YRUVrUUZ3V1ZnQ0I0VkdTZTI5YVZvb1RxT1pERXRBWUZ5TUdOU3l2V1NDTysxSmFHTEJpVE03QXVCUElnRXdEOHFvV0dSck9JNXdWQTZZWTQvdFMxMGdIT1prbUZKbm9UeS9PWnJRdUE3NnNTTmpFODUwbnhHT1oySHBLSEVJeElsY2RqaVBLZ3BLL3NDdTBNdDJQb1JYYUJlNjRhTlJMd0JCTXpwVUFLTThnTVIyb21RUEFGNkVRQU92VE5TcFJBTGZEdE95RHprajBBTmFkdjJoeENoVUZ3aEZQaFZDYlk1NUJYUFBuVXFVQ2Q2K0dZbDFrN1NUSjllZFMwMWtNRHArUmtyNlZLbEJvMm5TSVdBTjhMekpHTTh2MG9UM0xxbVJvSTJ4SU1kLzgxS2xGTkRqMElBSUtubkhpOUo1Wk9LWTRmaUVoUXNTdTJwWkJPWkxEK0xjNzl1Z2lWS0I5QXVGazdRMFpJWTVsWjVkaVQ1MWtmZjcxcDRZS1EzT0I0aE81RTFLbEE4L3RFT3NGSVBoeXJ1cHgwZzRuWXhRRGN1Rmd0dFlucTVPT3NuTlNwUU1peGNJTVhsa2JnSTJNYlNTSm9nNE53RzFYWDFSZ2dnS3AzSkt3ZFhxS2xTaWs3SEZNVlpIdUV5ckF4cUc0SXdhOGhiYUlNQXhCZzdIc1IwcnRTaUxJWk0vVDlLMFB1QUlrM0ZVUitGaitRcVZLejIzT0hwZnNsd2x1K0dXMlNHVExJek1GUExXc0NHMjJiTmVwdGNCYzFhZEptZGd5RDBKMnFWS3FCM3J0cTM0V1c1SS9uWDg0TTBxT0xzYXRRVWh2eEVLVDZnQTFLbFZCdFFiS21mVWZuUWtsZWt3UWNZTTlqTlNwVUNhV0FHWmxtVE9HWnl2a0JPQlNseXhkWnBlNEFKK0cyaXFJN3MwbXBVb0tXN01TQ3hjZEdDUjlGRS8zcUZDcHdUNWVFY29HUU8xU3BWQytuU1I0UXVxZG9tTnBNRFluRzVQYU0xUyt3VUhWaU45LzZlWXFWS0JTL3dBWGJnU1RuYU5RK29vRGNJR2dnc1p6OFVENmlhbFNpT2ZjMDZIL0FMTit0ZHFWS0QvLzJRPT0="
 */

  simplefile: File;

  //mostrar los inputs de la card (titulo subtitulo e imagen)

  imagecardPreviewts: any;
  imagecardPreviewdb: any;
  imagecardSOLOBYTEARRAY: any;

  showtitulo: boolean = false;
  showsubtitulo: boolean = false;
  titulomessage: string = 'EXPERIENCIA';

  //mostrar el boton de editar y guardar
  showcardinput: boolean = false;

  //show titulo card input
  showinsidecardtitulo: boolean = false;
  showinsidecardsubtitulo: boolean = false;
  showinsidecardimg: boolean = false;

  //esadmin 
  ESADMIN: String;

  cardlistdatabase = [];

  cardslist: {title: string, subtitle: string, url: string}[] = [

    {
      title: 'Experiencia numero 1',
      subtitle: 'Proyecto de Web api de busqueda, edicion y eliminacion de peliculas y personajes junto a su imagen.',
      url: 'assets/experiencia/cocina.jpg'
    },

    {
      title: 'experiencia numero 2', 
      subtitle: 'Proyecto de Web api de busqueda, edicion y eliminacion de peliculas y personajes junto a su imagen.',
      url: 'assets/experiencia/cocina.jpg'
    },

    {
      title: 'experiencia numero 3',
      subtitle: 'Proyecto de Web api de busqueda, edicion y eliminacion de peliculas y personajes junto a su imagen.',
      url: 'assets/experiencia/cocina.jpg'
    },

    {
      title: 'experiencia numero 4',
      subtitle: 'Proyecto de Web api de busqueda, edicion y eliminacion de peliculas y personajes junto a su imagen.', 
      url: 'assets/experiencia/cocina.jpg'
    },

    {
      title: 'experiencia numero 5', 
      subtitle: 'Proyecto de Web api de busqueda, edicion y eliminacion de peliculas y personajes junto a su imagen.',
      url: 'assets/experiencia/cocina.jpg'
    },

    {
      title: 'experiencia numero 6',
      subtitle: 'Proyecto de Web api de busqueda, edicion y eliminacion de peliculas y personajes junto a su imagen.', 
      url: 'assets/experiencia/cocina.jpg'
    },

    {
      title: 'experiencia numero 7',
      subtitle: 'Proyecto de Web api de busqueda, edicion y eliminacion de peliculas y personajes junto a su imagen.',
      url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
    },

    {
      title: 'experiencia numero 8', 
      subtitle: 'Proyecto de Web api de busqueda, edicion y eliminacion de peliculas y personajes junto a su imagen.', 
      url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
    },

  ];

  //cardgetlist: {titulocard: string, subtitulocard: string, imagencard: string}[] = [];

  cardgetlist2: ExperienciacardModel[] = [
    {titulocard: '', subtitulocard: '', imagencard: ''}
  ];

  cardiniciavacio = [];

  login: boolean = true;
  esadmin: String;


  //formulario card inputs
  form: FormGroup;

  //formulario inside card inputs 
  formcardedit: FormGroup;

  constructor(
    private esadminservice: EsadminService,
    private localstorageService: LocalstorageService,
    private expservices: ExperienciaService,
    private formBuilder: FormBuilder,
    private _sanitizer:DomSanitizer
  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      titulocard: ['', { validators: [
          Validators.required, 
          Validators.minLength(3)
        ],
      }],
      subtitulocard: ['',{ validators: [
        Validators.required,
        Validators.minLength(3)
      ]
      }],
      imagencard: [''],
    });

    //formulario inside card inputs
    this.formularioInside();


    const rol = this.localstorageService.getStorageRole("role")
    this.localstorageService.changeRolValue$(rol);
    this.localstorageService.getRolValue$().pipe(map(rol =>{ this.ESADMIN = rol, console.log(rol)})).subscribe();

    this.esadminservice.currentValue.subscribe((data) => {
       //this.ESADMIN = data;
    });

    this.Cardlist();
  }

  //formulario inside cards
  formularioInside(){
    this.formcardedit = this.formBuilder.group({

      tituloeditcard: ['hhhh', { validators: [
          Validators.required, 
          
        ],
      }],
      subtituloeditcard: ['', { validators: [
        Validators.required,
        Validators.minLength(3)
      ]
      }],
      editarimagencard: [''],
    });
  }
 

  ngAfterViewInit(){
  }

  Cardlist(){
    return this.expservices.getcardlist().pipe(map(cards => {
      this.cardlistdatabase = cards;

      console.log(this.cardlistdatabase.length);

      //console.log(cards.length); 
      //console.log(cards[0].titulocard); 

      

      //console.log(this.cardgetlist2);

      //console.log(atob((<any>cards).imagencard));

      //console.log("base_64_encode: "+new TextDecoder.decode(this.cardlistdatabase.imagencard));
      //var lerr = new TextDecoder.decode(this.cardlistdatabase.imagencard);
      //byte array
      //const uint8array = new TextEncoder().encode(this.imagencard_SOLO_BYTEARRAY_SIN_TEXT);

      //text array
      //const decodeimgstring = new TextDecoder().decode(this.cardlistdatabase.imagencard);

      //console.log("decode img string..._"+decodeimgstring);

      //let result = this.fromBinary(uint8array);

      //console.log("probando... "+result);

      //var uint8array = TextEncoder(encoding).encode(string);
      //var string = TextDecoder(encoding).decode(this.cardlistdatabase.imagencard);
      //console.log("byte de texto... "+atob(this.imagencard_SOLO_BYTEARRAY_SIN_TEXT)); //new TextDecoder("utf8").decode(uint8array))

      //console.log(Buffer.from(this.imagencard_SOLO_BYTEARRAY_SIN_TEXT).toString());

      //console.log(decodeimgstring);

      

      debugger
    })).subscribe();
  }

  clickcard($event){
    console.log(`se clickeo el evento: ${$event}`);
  }


  //eliminar todas las cards
  deletecards(){
    this.expservices.deletecards().subscribe({
      next: data => {
        if(data){
          this.Cardlist();
        }
      },
      error: error => {

      }
    });
  }


  emptyList(){
   return this.cardgetlist2.forEach((cardlist2s, index) => {

    if(cardlist2s.titulocard[0].length <= 0 || cardlist2s.subtitulocard[0].length <= 0 || cardlist2s[0].imagencard.length <= 0){
      return true;
    }
     return false;
    });
  }
  
  //cargamos imagen
  subirimagen($imagencardpreview){

    this.simplefile = $imagencardpreview.target.files[0];
    let imageFormData = new FormData();

    imageFormData.append('imagencardpreview',  this.simplefile);

    this.expservices.getImgcardPreview(imageFormData).pipe(map(

      imagencardpreview => {
        this.imagencard_SOLO_SIN_data_imagejpg_base64 =  imagencardpreview.imagecardPreviewts;
        //this. imagencard_SOLO_BYTEARRAY_SIN_TEXT = imagencardpreview.imagecardPreviewts;
        this.imagecardPreviewts = 'data:image/jpg;base64,' + imagencardpreview.imagecardPreviewts,
        //this.imagecardPreviewts = imagencardpreview.imagecardPreviewts,
        //this.imagecardPreviewts = 'data:image/jpg;base64,' + imagencardpreview.imagecardPreviewts,

        this.imagecardPreviewdb = imagencardpreview.imagencardPreviewdb;

        console.log("supuestaimagenDTABASE: "+imagencardpreview.imagencardPreviewdb);

        debugger

        //let objectURL = URL.createObjectURL(this.imagecardPreviewdb);       
        //this.imagetest = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        //debugger
      }
      
    )).subscribe(); 


  }


  //inputs getters
  get titulocard() {
    return this.form.controls['titulocard'].value;
  }

  get subtitulocard(){
    return this.form.controls['subtitulocard'].value;
  }


  //crea las nuevas cards desde CERO
  crearnuevacardsubmit(){
    
    if(this.form.valid){
      
      
      let titulocard = this.titulocard;
      console.log("que pasa: subtitulo: "+titulocard);

      let subtitulocard = this.subtitulocard;
      console.log("que pasa: subtitulo: "+subtitulocard);

      const nuevacard = new FormData();
      nuevacard.append("titulocard", titulocard);
      nuevacard.append("subtitulocard", subtitulocard);

      //CON texto 
      //nuevacard.append("imagecardPreviewts", this.imagecardPreviewts);

      
      //SIN texto 
      nuevacard.append("imagecardPreviewts", this.imagencard_SOLO_SIN_data_imagejpg_base64);
      

      console.log( nuevacard.get("subtitulocard"));

      debugger
      this.expservices.crearcardnueva(nuevacard).pipe(map(result =>
        {
          if(result){
            this.Cardlist();
            debugger
          }
      
      })).subscribe();

    }
  }

  //getter and setters inputs
  get tituloeditcard() {
    return this.formcardedit.controls['tituloeditcard']?.value;
  }

  get subtitulocardedit() {
    return this.formcardedit.controls['subtituloeditcard']?.value;
  }

  //SUBMIT del form inside card inputs
  actualizarcardsubmit(){
    
    let titulocardedit = this.tituloeditcard;
    console.log("que pasa: titulo: "+titulocardedit);

    let subtitulocardedit = this.subtitulocardedit;
    console.log("que pasa: subtitulo: "+subtitulocardedit);

    const nuevacard = new FormData();
    nuevacard.append("titulocardedit", titulocardedit);
    nuevacard.append("subtitulocardedit", subtitulocardedit);

    debugger

  }

  //EDITAR TITULO DENTRO DE CARD actualizar
  //TODO: guardar titulo
  ActualizarTitulo(id){
    console.log("save tituloooooo id: "+id);
    let titulodata = new FormData();
    const titulo = this.tituloeditcard;
    //this.subtitulomessage = this.form.get('subtitulo').value;
    if(titulo.length <= 0){
      console.log("que significa it: "+titulo);
      return;
    }
    
    console.log("que significa it: "+titulo);

    console.log("que significa it despues de return");
    titulodata.append("id" ,id);
    titulodata.append('tituloeditcard', titulo);


    this.expservices.updatetitulocard(titulodata).pipe(map(
      titulo => {
        this.titulomessage = titulo.titulo;

        if(titulo){
          this.Cardlist();
        }
      }

      
    )).subscribe();
    
    console.log("presionamos el savetitulo");
    //debugger
  }

   //EDITAR TITULO DENTRO DE CARD actualizar
  //TODO: guardar titulo
  ActualizarSubtitulo(id){
    console.log("save tituloooooo id: "+id);
    let subtitulodata = new FormData();
    const subtitulo = this.subtitulocardedit;
    //this.subtitulomessage = this.form.get('subtitulo').value;
    if(subtitulo.length <= 0){
      console.log("que significa it: "+subtitulo);
      return;
    }
    
    console.log("que significa it: "+subtitulo);

    console.log("que significa it despues de return");
    subtitulodata.append("id" ,id);
    subtitulodata.append('subtituloeditcard', subtitulo);


    
    this.expservices.updatesubtitulocard(subtitulodata).pipe(map(

      subtitulo => { this.titulomessage = subtitulo.titulo

      if(subtitulo){
        this.Cardlist();
      }

    }
  

      
    )).subscribe();
    
    console.log("presionamos el savetitulo");
    //debugger
  }

  ActualizarImg(id, imagencard){

    //const imagencardd = imagencard.target.files[0];
    const imagen = imagencard.target.files[0];
    console.log(this.simplefile)

    let imagencarddata = new FormData();
    imagencarddata.append('id', id);
    imagencarddata.append('imagencardpreview', imagen);
   
    console.log(imagencarddata)

    this.expservices.updateimg(imagencarddata).pipe(map(imagen => {

      console.log(imagen);

    })).subscribe(
    
      {
        next: data => {

          console.log(data);
          debugger

          this.Cardlist();
          
        },
        error: error => console.log(error)
      }
    );


  }

  //eliminar una card por su id
  borrarcardporid(id){

   //const cardformdata = new FormData();
   //cardformdata.append("id", id);

   this.expservices.S_borrarcardporid(id).subscribe({
    next: data => {
      if(data){
        this.Cardlist();
      }
    
    },
    error: data => (data)
   });

  }

}