| package |
package := Package name: 'tpClinica (1)'.
package paxVersion: 1;
	basicComment: ''.


package classNames
	add: #Clinica;
	add: #Consulta;
	add: #Gimnasia;
	add: #Minuta;
	add: #ObraSocial;
	add: #PacienteObraSocial;
	add: #PacienteParticular;
	add: #Persona;
	add: #Profesional;
	add: #Reunion;
	add: #Servicio;
	yourself.

package binaryGlobalNames: (Set new
	yourself).

package globalAliases: (Set new
	yourself).

package setPrerequisites: #(
	'C:\Users\IPP\Documents\Dolphin Smalltalk 7\Core\Object Arts\Dolphin\Base\Dolphin'
	'C:\Users\IPP\Documents\Dolphin Smalltalk 7\Core\Object Arts\Dolphin\Base\Dolphin Legacy Date & Time'
	'C:\Users\IPP\Documents\Dolphin Smalltalk 7\Core\Object Arts\Dolphin\Base\Dolphin Message Box'
	'C:\Users\IPP\Documents\Dolphin Smalltalk 7\Core\Object Arts\Dolphin\MVP\Presenters\Prompters\Dolphin Prompter'
	'C:\Users\IPP\Documents\Dolphin Smalltalk 7\Core\Object Arts\Dolphin\System\Random\Dolphin Random Stream').

package!

"Class Definitions"!

Object subclass: #Clinica
	instanceVariableNames: 'listadoProf listadoObra minutas pacintes'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Object subclass: #Minuta
	instanceVariableNames: 'fechaMinuta peso pacienteMinuta servicioMinuta'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Object subclass: #ObraSocial
	instanceVariableNames: 'codigo nombre porcentaje'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Object subclass: #Persona
	instanceVariableNames: 'nroDoc tipoDoc apellido nombre direccion telefono'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Object subclass: #Servicio
	instanceVariableNames: 'descripcion fechaServicio'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Persona subclass: #PacienteObraSocial
	instanceVariableNames: 'obraSocial'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Persona subclass: #PacienteParticular
	instanceVariableNames: ''
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Persona subclass: #Profesional
	instanceVariableNames: 'matricula tarifaReunion tarifaConsulta especialidad'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Servicio subclass: #Consulta
	instanceVariableNames: 'profesional'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Servicio subclass: #Gimnasia
	instanceVariableNames: 'tipo'
	classVariableNames: 'Costo'
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Servicio subclass: #Reunion
	instanceVariableNames: 'profesional costo'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!

"Global Aliases"!


"Loose Methods"!

"End of package definition"!

"Source Globals"!

"Classes"!

Clinica guid: (GUID fromString: '{6b599be6-2178-403a-9212-7ec4f661cc64}')!
Clinica comment: ''!
!Clinica categoriesForClass!Kernel-Objects! !
!Clinica methodsFor!

busquedaObra: anObject

|retorno|
retorno:=listadoObra detect: [:i | i codigo= anObject] ifNone: [nil].
^retorno!

busquedaPaciente: anObject
|retorno|
retorno:= pacintes detect: [:i | i nroDoc = anObject] ifNone: [nil].
^retorno!

busquedaProfesional: anObject
|retorno|
retorno:=listadoProf detect: [:i | i matricula = anObject] ifNone: [nil].
^retorno!

busquedaProfEsp: anObject
|retorno subEspecialidad|
subEspecialidad:= listadoProf select: [:i | i especialidad =anObject ]. 
retorno:= subEspecialidad at: (Random new next: subEspecialidad  size).
^retorno!

busquedaSubObras:anObject
|subObras paciente codObra|
subObras:= OrderedCollection new.
subObras:= minutas select: [:i | paciente := i pacienteMinuta.
codObra:=paciente obraSocial .
codObra =anObject. ]. 
^subObras!

cargaLisProf
|prof opcion|
opcion:=0.
[opcion=0]whileTrue: [prof:= Profesional new.
prof cargaDatosPer.
prof cargaDatosProfe.

listadoProf add: prof.
opcion:= Prompter prompt: 'Desea agregar a un nuevo profesional: SI(0), NO(1)'
]

!

cargaMinuta
|op op2 op3 serv auxiliar auxCosto dni auxDni minuta profAleatorio espe|
op:=0.
[op=0]whileTrue: [
op3:=0.
auxiliar:=nil.
op2:=0.
auxDni:=nil.


[auxDni =nil & op3=0]whileTrue: [
dni:=(Prompter prompt: 'Ingrese el numero de documento del paciente: ' )asNumber asInteger.
auxDni:=self busquedaPaciente: dni.
(auxDni =nil)ifTrue: [
op3:=4.
[op3=0|op3=1]whileFalse: [
op3:=(Prompter prompt: 'No se encontro el paciente, desea ingresar otro? SI(0), NO(1):  ' )asNumber asInteger .]
.].].

(auxDni~= nil)ifTrue: [
minuta:= Minuta new.
minuta fechaMinuta: (Date today).
minuta peso: (Prompter prompt: 'Ingrese el peso del paciente: ' )asNumber.
minuta pacienteMinuta: auxDni.
[op2=2|op2=1|op2=3]whileFalse: [
op2:=(Prompter prompt: 'Ingrese el servicio que desea realizar el paciente: REUNION(1),GIMNASIA(2),CONSULTA(3). ' )asNumber asInteger.].

(op2=1)ifTrue: [
serv:= Reunion new.
[auxiliar =nil]whileTrue: [
profAleatorio:=(listadoProf at: (Random new next: listadoProf size)).
serv profesional:profAleatorio.
auxCosto:=(Prompter prompt: 'Ingrese el costo de la reunion: ' ).
auxCosto:=auxCosto+ profAleatorio costo.
serv costo: auxCosto .
serv fechaServicio: (Date fromString:(Prompter prompt: 'Ingrese la fecha de la reunion: ' )).
serv descripcion: (Prompter prompt: 'Ingrese la descripcion de la reunion: ' ).
minuta servicioMinuta: serv.].].

(op2=2)ifTrue: [
serv:= Gimnasia new.
[auxiliar =nil]whileTrue: [
serv fechaServicio: (Date fromString:(Prompter prompt: 'Ingrese la fecha de la sesion de gimnasia: ' )).
serv tipo: (Prompter prompt: 'Ingrese el tipo de gimnasia ' ).
serv descripcion: (Prompter prompt: 'Ingrese la descripcion de la clase de gimnasia: ' ).
minuta servicioMinuta: serv.].].

(op2=3)ifTrue: [
serv:= Consulta new.
[auxiliar =nil]whileTrue: [
espe:=0.
[espe=1|espe=2|espe =3]whileFalse: [
espe:=(Prompter  prompt: 'Ingrese la especialidad. MEDICO CLINICO(1), PSICOLOGO(2), NUTRICIONISTA(3)' )asNumber asInteger.
].
(espe=1)ifTrue: [
espe:='medico'.
].
(espe=2)ifTrue: [
espe:='psicologo'.
].
(espe=3)ifTrue: [
espe:='nutricionista'.
].
profAleatorio:=(self busquedaProfEsp: espe) .
serv profesional:profAleatorio.
serv costo: profAleatorio costo.
serv fechaServicio: (Date fromString:(Prompter prompt: 'Ingrese la fecha de la consulta ' )).
serv descripcion: (Prompter prompt: 'Ingrese la descripcion de la consulta: ' ).
minuta servicioMinuta: serv.].].].
minutas add: minuta.

op:=(Prompter prompt: 'Desea ingresar otra minuta SI(0) NO(1)' )asNumber asInteger .

]











!

cargaObras

|op  obra|
op:=0.
[op=0]whileTrue: [
obra:= ObraSocial new.
obra nombre: (Prompter prompt: 'Ingrese el nombre de la obra social: ').
obra codigo:  (Prompter prompt: 'Ingrese el codigo de la obra social: ')asNumber asInteger.
obra porcentaje: (Prompter prompt: 'Ingrese el porcentaje de cobertura de la obra social: ')asNumber.
listadoObra add: obra.
op:=3.
[op=0|op=1]whileFalse: [
op:= (Prompter prompt: 'Desea cargar una nueva obra social? SI(0), NO(1): ').
].
].!

cargaPaciente

|op paciente obra aux op2|
op:=0.
[op=1|op=2]whileFalse: [op:=(Prompter prompt: 'Ingrese una opcion: PACIENTE PARTICULAR [1], PACIENTE CON OBRA SOCIAL[2]' )asNumber asInteger.
].
(op=1)ifTrue: [
paciente:= PacienteParticular new.
paciente cargaDatosPer.
pacintes add: paciente.

].

(op=2)ifTrue: [
obra:=(Prompter prompt: 'Ingrese codigo de su obra social: ' )asNumber asInteger.
aux:= self busquedaObra: obra.

(aux=nil)ifTrue: [
op2:=0.
[op2=1|op2=2]whileFalse: [op2:=(Prompter prompt: 'Su obra social no es aceptada en la clinica. Desea continuar como paciente particular? SI(1)NO(2) ')asNumber asInteger].
(op2=1)ifTrue: [
paciente:= PacienteParticular new.
paciente cargaDatosPer.
pacintes add: paciente].].

(aux~=nil)ifTrue: [
paciente:= PacienteObraSocial new.
paciente cargaDatosPer.
paciente obra: obra.
pacintes add: paciente.
]

]




!

inicio
listadoObra:=OrderedCollection new.
listadoProf:=OrderedCollection new.
pacintes:=OrderedCollection new.
minutas:= OrderedCollection new.
!

listadoObras
|codObra fechaInicio fechaFin auxObra subObras listado suma auxMin op |
op:=0.
auxObra:=nil.
[op=0|auxObra=nil]whileTrue: [
codObra:=(Prompter prompt: 'Ingrese el codigo de la obra social' )asNumber asInteger .
auxObra:= self busquedaObra: codObra.
(auxObra=nil)ifTrue: [
op:=(Prompter prompt: 'No se encontro la obra. Desea ingresar otra: SI(0) NO(1)' )asNumber asInteger.
].
].
(auxObra ~= nil)ifTrue: [
subObras:= OrderedCollection new.
subObras:= self busquedaSubObras: codObra.
fechaInicio:= Date fromString: (Prompter prompt: 'Ingrese la fecha de inicio' ).
fechaFin:= Date fromString: (Prompter prompt: 'Ingrese la fecha de fin' ). 
listado:=OrderedCollection new.
listado:= subObras select: [:i | ((i servicioMinuta fechaServicio)>=fechaInicio )& ((i servicioMinuta fechaServicio)<=fechaFin ) ].
suma:=0.
Transcript show: 'Nombre de la obra social: ', auxObra nombre.
Transcript cr.
Transcript show: 'Porcentaje de cobertura: ', auxObra porcentaje .
Transcript cr.
Transcript cr.
listado do: [:i | 
auxMin:=i.
Transcript show: 'Fecha minuta: ',auxMin fechaMinuta.
Transcript cr.
Transcript show: 'Fecha servicio: ',auxMin servicioMinuta fechaServicio.
Transcript cr.
Transcript show: 'Nombre y apellido paciente: ',auxMin servicioMinuta pacienteMinuta nombre, auxMin servicioMinuta pacienteMinuta apellido .
Transcript cr.
Transcript show: 'Descripcion servicio: ',auxMin servicioMinuta descripcion.
Transcript cr.
Transcript show: 'Costo actividad: ',auxMin servicioMinuta costo.
suma:=suma+((auxMin servicioMinuta costo)*(auxObra porcentaje)) / 100.
Transcript cr.
Transcript show: 'Importe a pagar por la obra social: ',((auxMin servicioMinuta costo)*(auxObra porcentaje)) / 100.].
Transcript cr.
Transcript show: 'Importe total a pagar por la obra social: ', suma.
]!

menu
|op|
op:=7.
[op=0]whileFalse: [MessageBox notify: '
MENU:
1- Registrar profesional
2- Registrar obra social
3- Registrar paciente
4- Registrar minuta
5- Listado de facturacion
6-Costo gimnasia
0-Salir'.
op:=(Prompter prompt: 'Ingrese opcion: ' )asNumber asInteger.
[op=1|op=2|op=3|op=0|op=4|op=5|op=6]whileFalse: [
op:=(Prompter prompt: 'Ingrese opcion: ' )asNumber asInteger.
].
[op=1]ifTrue: [
self cargaLisProf .].
[op=2]ifTrue: [
self cargaObras .].
[op=3]ifTrue: [
self cargaPaciente.].
[op=4]ifTrue: [
self cargaMinuta .].
[op=5]ifTrue: [
self listadoObras .].
[op=6]ifTrue: [
Gimnasia asignarCosto .].
].
! !
!Clinica categoriesForMethods!
busquedaObra:!public! !
busquedaPaciente:!public! !
busquedaProfesional:!public! !
busquedaProfEsp:!public! !
busquedaSubObras:!public! !
cargaLisProf!public! !
cargaMinuta!public! !
cargaObras!public! !
cargaPaciente!public! !
inicio!public! !
listadoObras!public! !
menu!public! !
!

Minuta guid: (GUID fromString: '{abff84a2-3d57-4eb3-87e0-8647aefad215}')!
Minuta comment: ''!
!Minuta categoriesForClass!Kernel-Objects! !
!Minuta methodsFor!

fechaMinuta
	^fechaMinuta!

fechaMinuta: anObject
	fechaMinuta := anObject!

pacienteMinuta
	^pacienteMinuta!

pacienteMinuta: anObject
	pacienteMinuta := anObject!

peso
	^peso!

peso: anObject
	peso := anObject!

servicioMinuta
	^servicioMinuta!

servicioMinuta: anObject
	servicioMinuta := anObject! !
!Minuta categoriesForMethods!
fechaMinuta!accessing!private! !
fechaMinuta:!accessing!private! !
pacienteMinuta!accessing!private! !
pacienteMinuta:!accessing!private! !
peso!accessing!private! !
peso:!accessing!private! !
servicioMinuta!accessing!private! !
servicioMinuta:!accessing!private! !
!

ObraSocial guid: (GUID fromString: '{e01d34a5-3383-4f64-a066-6fc00fb78f68}')!
ObraSocial comment: ''!
!ObraSocial categoriesForClass!Kernel-Objects! !
!ObraSocial methodsFor!

cargaDatosObra

self nombre: (Prompter prompt:'Ingrese el nombre de la obra social: ').
self codigo:  (Prompter prompt:'Ingrese el codigo de la obra social: ')asNumber asInteger .
self porcentaje:  (Prompter prompt:'Ingrese el porcentaje de cobertura: ')asNumber asInteger .!

codigo
	^codigo!

codigo: anObject
	codigo := anObject!

nombre
	^nombre!

nombre: anObject
	nombre := anObject!

porcentaje
	^porcentaje!

porcentaje: anObject
	porcentaje := anObject! !
!ObraSocial categoriesForMethods!
cargaDatosObra!public! !
codigo!accessing!private! !
codigo:!accessing!private! !
nombre!accessing!private! !
nombre:!accessing!private! !
porcentaje!accessing!private! !
porcentaje:!accessing!private! !
!

Persona guid: (GUID fromString: '{e058e5f6-559b-4727-a59e-5cb3932eb0a1}')!
Persona comment: ''!
!Persona categoriesForClass!Kernel-Objects! !
!Persona methodsFor!

apellido
	^apellido!

apellido: anObject
	apellido := anObject!

cargaDatosPer

self nombre: (Prompter prompt: 'Ingrese su nombre: ' )asString .
self apellido: (Prompter prompt: 'Ingrese su apellido ' )asString .
self nroDoc: (Prompter prompt: 'Ingrese su numero de documento ' )asNumber asInteger.
self tipoDoc:  (Prompter prompt: 'Ingrese tipo de documento: ' )asString.
self telefono: (Prompter prompt: 'Ingrese su numero: ' )asNumber asInteger.
self direccion: (Prompter prompt: 'Ingrese su direccion: ' )asString.!

direccion
	^direccion!

direccion: anObject
	direccion := anObject!

nombre
	^nombre!

nombre: anObject
	nombre := anObject!

nroDoc
	^nroDoc!

nroDoc: anObject
	nroDoc := anObject!

telefono
	^telefono!

telefono: anObject
	telefono := anObject!

tipoDoc
	^tipoDoc!

tipoDoc: anObject
	tipoDoc := anObject! !
!Persona categoriesForMethods!
apellido!accessing!private! !
apellido:!accessing!private! !
cargaDatosPer!public! !
direccion!accessing!private! !
direccion:!accessing!private! !
nombre!accessing!private! !
nombre:!accessing!private! !
nroDoc!accessing!private! !
nroDoc:!accessing!private! !
telefono!accessing!private! !
telefono:!accessing!private! !
tipoDoc!accessing!private! !
tipoDoc:!accessing!private! !
!

Servicio guid: (GUID fromString: '{86788e99-907f-4134-ad42-64033bbd5a08}')!
Servicio comment: ''!
!Servicio categoriesForClass!Kernel-Objects! !
!Servicio methodsFor!

cargaServicio
self fecha:(Date fromString: (Prompter prompt: 'Ingrese fecha de su servicio: ' )) .
self descripcion:  (Prompter prompt: 'Ingrese descripcion de su servicio: ' ).!

descripcion
	^descripcion!

descripcion: anObject
	descripcion := anObject!

fechaServicio
	^fechaServicio!

fechaServicio: anObject
	fechaServicio := anObject! !
!Servicio categoriesForMethods!
cargaServicio!public! !
descripcion!accessing!private! !
descripcion:!accessing!private! !
fechaServicio!accessing!private! !
fechaServicio:!accessing!private! !
!

PacienteObraSocial guid: (GUID fromString: '{96110c90-607c-4489-a131-7bf6bbf06b9f}')!
PacienteObraSocial comment: ''!
!PacienteObraSocial categoriesForClass!Kernel-Objects! !
!PacienteObraSocial methodsFor!

obraSocial
	^obraSocial!

obraSocial: anObject
	obraSocial := anObject! !
!PacienteObraSocial categoriesForMethods!
obraSocial!accessing!private! !
obraSocial:!accessing!private! !
!

PacienteParticular guid: (GUID fromString: '{6551382c-e350-4077-ad8c-2c620fb65486}')!
PacienteParticular comment: ''!
!PacienteParticular categoriesForClass!Kernel-Objects! !
Profesional guid: (GUID fromString: '{a141220f-34d7-40cb-926f-1785113b0075}')!
Profesional comment: ''!
!Profesional categoriesForClass!Kernel-Objects! !
!Profesional methodsFor!

cargaDatosProfe
|espe|
self cargaDatosPer.
self tarifaConsulta: (Prompter prompt: 'Ingrese el costo de su consulta: ' )asNumber .
self tarifaReunion: (Prompter prompt: 'Ingrese el costo de la reunion: ' )asNumber .
self matricula: (Prompter prompt: 'Ingrese su numero de matricula: ' )asNumber .
espe:= (Prompter prompt: 'Ingrese su especialidad: MEDICO CLINICO(1), PSICOLOGO(2), NUTRICIONISTA(3)' )asNumber .
(espe=1)ifTrue: [
espe:='medico'.
].

(espe=2)ifTrue: [
espe:='psicologo'.
].

(espe=3)ifTrue: [
espe:='nutricionista'.
].


self especialidad: espe.


!

especialidad
	^especialidad!

especialidad: anObject
	especialidad := anObject!

matricula
	^matricula!

matricula: anObject
	matricula := anObject!

tarifaConsulta
	^tarifaConsulta!

tarifaConsulta: anObject
	tarifaConsulta := anObject!

tarifaReunion
	^tarifaReunion!

tarifaReunion: anObject
	tarifaReunion := anObject! !
!Profesional categoriesForMethods!
cargaDatosProfe!public! !
especialidad!accessing!private! !
especialidad:!accessing!private! !
matricula!accessing!private! !
matricula:!accessing!private! !
tarifaConsulta!accessing!private! !
tarifaConsulta:!accessing!private! !
tarifaReunion!accessing!private! !
tarifaReunion:!accessing!private! !
!

Consulta guid: (GUID fromString: '{3c7cc168-0f3c-40bd-af01-b1fb37e7e741}')!
Consulta comment: ''!
!Consulta categoriesForClass!Kernel-Objects! !
!Consulta methodsFor!

asignaProfesional

! !
!Consulta categoriesForMethods!
asignaProfesional!public! !
!

Gimnasia guid: (GUID fromString: '{811f99da-cb73-4030-8941-c48870c7fa1c}')!
Gimnasia comment: ''!
!Gimnasia categoriesForClass!Kernel-Objects! !
!Gimnasia methodsFor!

cargaTipo
self cargaServicio.
self tipo: (Prompter prompt: 'Ingrese que tipo de actividad que se dicta:' ).!

tipo
	^tipo!

tipo: anObject
	tipo := anObject! !
!Gimnasia categoriesForMethods!
cargaTipo!public! !
tipo!accessing!private! !
tipo:!accessing!private! !
!

!Gimnasia class methodsFor!

asignarCosto
Costo:=(Prompter prompt: 'Ingrese el costo: ' ).
^Costo! !
!Gimnasia class categoriesForMethods!
asignarCosto!public! !
!

Reunion guid: (GUID fromString: '{159db888-aa18-4f0b-8c81-0c3b31fe0c66}')!
Reunion comment: ''!
!Reunion categoriesForClass!Kernel-Objects! !
!Reunion methodsFor!

cargaCosto

self costo: (Prompter prompt: 'Ingrese costo de la reunion: ')asNumber .!

costo
	^costo!

costo: anObject
	costo := anObject!

profesional
	^profesional!

profesional: anObject
	profesional := anObject! !
!Reunion categoriesForMethods!
cargaCosto!public! !
costo!accessing!private! !
costo:!accessing!private! !
profesional!accessing!private! !
profesional:!accessing!private! !
!

"Binary Globals"!

