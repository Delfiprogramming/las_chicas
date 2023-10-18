﻿| package |
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
	'..\Documents\Dolphin Smalltalk 7\Core\Object Arts\Dolphin\Base\Dolphin'
	'..\Documents\Dolphin Smalltalk 7\Core\Object Arts\Dolphin\Base\Dolphin Legacy Date & Time'
	'..\Documents\Dolphin Smalltalk 7\Core\Object Arts\Dolphin\Base\Dolphin Message Box'
	'..\Documents\Dolphin Smalltalk 7\Core\Object Arts\Dolphin\MVP\Presenters\Prompters\Dolphin Prompter'
	'..\Documents\Dolphin Smalltalk 7\Core\Object Arts\Dolphin\System\Random\Dolphin Random Stream').

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
	instanceVariableNames: 'descripcion fecha'
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
	instanceVariableNames: 'profesional fechaConsulta'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Servicio subclass: #Gimnasia
	instanceVariableNames: 'tipo fechaGimnasia'
	classVariableNames: 'Costo'
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Servicio subclass: #Reunion
	instanceVariableNames: 'profesional costo fechaReunion'
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
|op op2 op3 serv profe auxiliar auxMatricula auxNombre auxCosto auxCostoTotal fecha dni auxDni minuta profAleatorio espe|
op:=0.
[op=0]whileTrue: [
op3:=0.
auxiliar:=nil.
op2:=0.
auxDni:=nil.


[auxDni =nil & op3=0]whileTrue: [
dni:=(Prompter prompt: 'Ingrese su numero de documento: ' )asNumber asInteger.
auxDni:=self busquedaPaciente: dni.
(auxDni =nil)ifTrue: [
op3:=4.
[op3=0|op3=1]whileFalse: [
op3:=(Prompter prompt: 'No se encontro su numero de documento, desea ingresar otro? SI(0), NO(1):  ' )asNumber asInteger .]
.].].

(auxDni~= nil)ifTrue: [
minuta:= Minuta new.
minuta fechaMinuta: (Date today).
minuta peso: (Prompter prompt: 'Ingrese su peso: ' )asNumber.
[op2=2|op2=1|op2=3]whileFalse: [
op2:=(Prompter prompt: 'Ingrese el servicio que desea realizar: REUNION(1),GIMNASIA(2),CONSULTA(3). ' )asNumber asInteger.].

(op2=1)ifTrue: [
serv:= Reunion new.
[auxiliar =nil]whileTrue: [
profAleatorio:=(listadoProf at: (Random new next: listadoProf size)).
serv profesional:profAleatorio.
"FALTA COSTO"
serv fechaReunion: (Date fromString:(Prompter prompt: 'Ingrese la fecha de la reunion: ' )).
minuta servicioMinuta: serv.].].

(op2=2)ifTrue: [
serv:= Gimnasia new.
[auxiliar =nil]whileTrue: [
serv fechaGimnasia: (Date fromString:(Prompter prompt: 'Ingrese la fecha de la sesion de gimnasia: ' )).
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

serv profesional: (self busquedaProfEsp: espe) .
"FALTA COSTO"
serv fechaReunion: (Date fromString:(Prompter prompt: 'Ingrese la fecha de la reunion: ' )).
minuta servicioMinuta: serv.].].].]











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

cargaServicio
|op op2 op3 serv profe auxiliar auxMatricula auxNombre auxCosto auxCostoTotal fecha|
op:=0.
[op=0]whileTrue: [
op3:=0.
auxiliar:=nil.
op2:=0.
[op2=2|op2=1|op2=3]whileFalse: [
op2:=(Prompter prompt: 'Ingrese el servicio que va a proveer: REUNION(1),GIMNASIA(2),CONSULTA(3). ' )asNumber asInteger.
].

(op2=1)ifTrue: [
serv:= Reunion new.
[auxiliar =nil & op3=0]whileTrue: [
profe:=(Prompter prompt: 'Ingrese la matricula de un profesional:  ' ).
auxiliar:=self busquedaProfesional: profe.
(auxiliar =nil)ifTrue: [
op3:=4.
[op3=0|op3=1]whileFalse: [
op3:=(Prompter prompt: 'La matricula ingresada no esta cargada en el sistema, desea ingresar otra SI(0), NO(1):  ' )asNumber asInteger .].].].
(auxiliar ~= nil)ifTrue: [
auxCosto:=(Prompter prompt: 'Ingrese la tarifa de la reunion:' )asNumber .

auxCosto:= auxCosto +auxiliar tarifaReunion. 
auxNombre:=( auxiliar nombre, auxiliar apellido).
fecha:= Date fromString: (Prompter prompt: 'Ingrese la fecha de la reunion: ' ).
serv fechaReunion:  fecha.
serv costo: auxCosto.
serv profesional: auxNombre .].].

(op2=3)ifTrue: [
serv:= Consulta new.
[auxiliar =nil & op3=0]whileTrue: [
profe:=(Prompter prompt: 'Ingrese la matricula de un profesional:  ' ).
auxiliar:=self busquedaProfesional: profe.
(auxiliar =nil)ifTrue: [
op3:=4.
[op3=0|op3=1]whileFalse: [
op3:=(Prompter prompt: 'La matricula ingresada no esta cargada en el sistema, desea ingresar otra SI(0), NO(1):  ' )asNumber asInteger .].].].
(auxiliar ~= nil)ifTrue: [
fecha:= Date fromString: (Prompter prompt: 'Ingrese la fecha de la consulta ' ).
auxCosto:= auxiliar tarifaConsulta . 
auxNombre:=( auxiliar nombre, auxiliar apellido).

serv fechaConsulta:fecha.
serv costo: auxCosto.
serv profesional: auxNombre .].].

(op2=2)ifTrue: [
serv:= Gimnasia new.
fecha:= Date fromString: (Prompter prompt: 'Ingrese la fecha de la consulta ' ).
serv fechaGimnasia:fecha.].].
op:=3.
[op=0|op=1]whileFalse: [
op:=(Prompter prompt: 'Desea ingresar otro servicio? SI(0), NO(1) ')asNumber asInteger.
].



!

inicio
listadoObra:=OrderedCollection new.
listadoProf:=OrderedCollection new.
pacintes:=OrderedCollection new.
minutas:= OrderedCollection new.
!

menu
|op tipo opAct|
tipo:=0. 
tipo:=(Prompter prompt: 'Paciente [1] Personal  [2]' )asNumber asInteger .
[tipo=1|tipo=2]whileFalse: [
tipo:=(Prompter prompt: 'Paciente [1] Personal  [2]' )asNumber asInteger .
].
[tipo=1]ifTrue: [
op:=4.
[op=0]whileFalse: [MessageBox notify: '
MENU:
1-Registrarse
2- Solicitar servicio
3-Listado obras
0-Salir'.
op:=(Prompter prompt: 'Ingrese opcion: ' )asNumber asInteger.
[op=1|op=2|op=3|op=0]whileFalse: [
op:=(Prompter prompt: 'Ingrese opcion: ' )asNumber asInteger.
].
[op=1]ifTrue: [
self cargaPaciente.].
[op=2]ifTrue: [
self cargaPaciente.].
[op=3]ifTrue: [
self cargaPaciente.].
].
].
[tipo=2]ifTrue: [
op:=7.
[op=0]whileFalse: [MessageBox notify: '
MENU:
1-Registrar profesional
2- Registrar obra social
3-Listado de facturacion
4-Cotizar actividades 
0-Salir'.
op:=(Prompter prompt: 'Ingrese opcion: ' )asNumber asInteger.
[op=1|op=2|op=3|op=0]whileFalse: [
op:=(Prompter prompt: 'Ingrese opcion: ' )asNumber asInteger.
].
[op=1]ifTrue: [
self cargaLisProf .].
[op=2]ifTrue: [
].
[op=3]ifTrue: [
self cargaPaciente.].
[op=4]ifTrue: [
opAct:=(Prompter prompt: 'Ingrese que actividad quiere cotizar: REUNION(1), GIMNASIA(2)' )asNumber asInteger].
(opAct=1)ifTrue: [

]
].
].! !
!Clinica categoriesForMethods!
busquedaObra:!public! !
busquedaPaciente:!public! !
busquedaProfesional:!public! !
busquedaProfEsp:!public! !
cargaLisProf!public! !
cargaMinuta!public! !
cargaObras!public! !
cargaPaciente!public! !
cargaServicio!public! !
inicio!public! !
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

fecha
	^fecha!

fecha: anObject
	fecha := anObject! !
!Servicio categoriesForMethods!
cargaServicio!public! !
descripcion!accessing!private! !
descripcion:!accessing!private! !
fecha!accessing!private! !
fecha:!accessing!private! !
!

PacienteObraSocial guid: (GUID fromString: '{96110c90-607c-4489-a131-7bf6bbf06b9f}')!
PacienteObraSocial comment: ''!
!PacienteObraSocial categoriesForClass!Kernel-Objects! !
PacienteParticular guid: (GUID fromString: '{6551382c-e350-4077-ad8c-2c620fb65486}')!
PacienteParticular comment: ''!
!PacienteParticular categoriesForClass!Kernel-Objects! !
Profesional guid: (GUID fromString: '{a141220f-34d7-40cb-926f-1785113b0075}')!
Profesional comment: ''!
!Profesional categoriesForClass!Kernel-Objects! !
!Profesional methodsFor!

cargaDatosProfe

self cargaDatosPer.
self tarifaConsulta: (Prompter prompt: 'Ingrese el costo de su consulta: ' )asNumber .
self tarifaReunion: (Prompter prompt: 'Ingrese el costo de la reunion: ' )asNumber .
self matricula: (Prompter prompt: 'Ingrese su numero de matricula: ' )asNumber .
self especialidad:  (Prompter prompt: 'Ingrese su especialidad: ' )asString .!

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

!

fechaConsulta
	^fechaConsulta!

fechaConsulta: anObject
	fechaConsulta := anObject! !
!Consulta categoriesForMethods!
asignaProfesional!public! !
fechaConsulta!accessing!private! !
fechaConsulta:!accessing!private! !
!

Gimnasia guid: (GUID fromString: '{811f99da-cb73-4030-8941-c48870c7fa1c}')!
Gimnasia comment: ''!
!Gimnasia categoriesForClass!Kernel-Objects! !
!Gimnasia methodsFor!

cargaTipo
self cargaServicio.
self tipo: (Prompter prompt: 'Ingrese que tipo de actividad que se dicta:' ).!

fechaGimnasia
	^fechaGimnasia!

fechaGimnasia: anObject
	fechaGimnasia := anObject!

tipo
	^tipo!

tipo: anObject
	tipo := anObject! !
!Gimnasia categoriesForMethods!
cargaTipo!public! !
fechaGimnasia!accessing!private! !
fechaGimnasia:!accessing!private! !
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

fechaReunion
	^fechaReunion!

fechaReunion: anObject
	fechaReunion := anObject!

profesional
	^profesional!

profesional: anObject
	profesional := anObject! !
!Reunion categoriesForMethods!
cargaCosto!public! !
costo!accessing!private! !
costo:!accessing!private! !
fechaReunion!accessing!private! !
fechaReunion:!accessing!private! !
profesional!accessing!private! !
profesional:!accessing!private! !
!

"Binary Globals"!

