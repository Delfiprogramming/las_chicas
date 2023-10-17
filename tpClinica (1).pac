| package |
package := Package name: 'tpClinica (1)'.
package paxVersion: 1;
	basicComment: ''.


package classNames
	add: #Clinica;
	add: #Consulta;
	add: #Gimnasia;
	add: #ObraSocial;
	add: #PacienteObraSocial;
	add: #PacienteParticular;
	add: #Persona;
	add: #Profesional;
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
	'..\Documents\Dolphin Smalltalk 7\Core\Object Arts\Dolphin\MVP\Presenters\Prompters\Dolphin Prompter').

package!

"Class Definitions"!

Object subclass: #Clinica
	instanceVariableNames: 'listadoProf listadoObra servicios pacintes'
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
	instanceVariableNames: 'profesional'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Servicio subclass: #Gimnasia
	instanceVariableNames: 'tipo'
	classVariableNames: 'Costo'
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

busquedaProfesional: anObject
|retorno|
retorno:=listadoProf detect: [:i | i matricula = anObject] ifNone: [nil].
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

cargaPaciente

|op paciente obra aux op2|
op:=0.
(op=1|op=2)whileFalse: [op:=(Prompter prompt: 'Ingrese una opcion: PACIENTE PARTICULAR [1], PACIENTE CON OBRA SOCIAL[2]' )asNumber asInteger.
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
(op2=1|op2=2)whileFalse: [op2:=(Prompter prompt: 'Su obra social no es aceptada en la clinica. Desea continuar como paciente particular? SI(1)NO(2) ')asNumber asInteger].
(op2=1)ifTrue: [
paciente:= PacienteParticular new.
paciente cargaDatosPer.
pacintes add: paciente].].

(aux=obra)ifTrue: [
paciente:= PacienteObraSocial new.
paciente cargaDatosPer.
PacienteObraSocial obra: obra.
pacintes add: paciente.
]

]




!

cargaServicio

||!

inicio
listadoObra:=OrderedCollection new.
listadoProf:=OrderedCollection new.
pacintes:=OrderedCollection new.
servicios:= OrderedCollection new.
!

menu
|op tipo|
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
2- Sacar turno
3-Listado profesional
4-Listado obras
0-Salir'.
op:=(Prompter prompt: 'Ingrese opcion: ' )asNumber asInteger.
[op=1|op=2|op=3|op=4|op=0]whileFalse: [
op:=(Prompter prompt: 'Ingrese opcion: ' )asNumber asInteger.
].
[op=1]ifTrue: [

]
].
].
[tipo=2]ifTrue: [
op:=7.
[op=0]whileFalse: [MessageBox notify: '
MENU:
1-Registrar profesional
2- Registrar obra social
3-Servicio
4-Registrar minuta
5-Listado de facturacion
6-Listado Profesional
7-Listado obras
0-Salir'.
op:=(Prompter prompt: 'Ingrese opcion: ' )asNumber asInteger.
[op=1|op=2|op=3|op=4|op=5|op=6|op=7|op=0]whileFalse: [
op:=(Prompter prompt: 'Ingrese opcion: ' )asNumber asInteger.
].
].
].! !
!Clinica categoriesForMethods!
busquedaObra:!public! !
busquedaProfesional:!public! !
cargaLisProf!public! !
cargaPaciente!public! !
cargaServicio!public! !
inicio!public! !
menu!public! !
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

"Binary Globals"!

