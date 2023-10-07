| package |
package := Package name: 'tpClinica'.
package paxVersion: 1;
	basicComment: ''.


package classNames
	add: #Clinica;
	add: #Persona;
	yourself.

package binaryGlobalNames: (Set new
	yourself).

package globalAliases: (Set new
	yourself).

package setPrerequisites: #(
	'..\..\Documents\Dolphin Smalltalk 7\Core\Object Arts\Dolphin\Base\Dolphin'
	'..\..\Documents\Dolphin Smalltalk 7\Core\Object Arts\Dolphin\Base\Dolphin Message Box'
	'..\..\Documents\Dolphin Smalltalk 7\Core\Object Arts\Dolphin\MVP\Presenters\Prompters\Dolphin Prompter').

package!

"Class Definitions"!

Object subclass: #Clinica
	instanceVariableNames: 'listadoProf listadoObra pacintes'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Object subclass: #Persona
	instanceVariableNames: 'nroDoc tipoDoc apellido nombre direccion telefono'
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

cargaLisProf
|prof continuar |
continuar:=true.
[continuar :=true]whileTrue: [
prof:=listadoProf new.
prof add cargaDatosProf.
]!

inicio
listadoObra:=OrderedCollection new.
listadoProf:=OrderedCollection new.
pacintes:=OrderedCollection new.
!

menu
|op tipo|
tipo:=0. 
tipo:=(Prompter prompt: 'Paciente [1] Personal  [2]' )asNumber asInteger .
(tipo=1||tipo=2)whileFalse: [
tipo:=(Prompter prompt: 'Paciente [1] Personal  [2]' )asNumber asInteger .
].
(tipo=1)ifTrue: [
op:=4.
[op=0]whileFalse: [MessageBox notify: '
MENU:
1-Registrarse
2- Sacar turno
3-Listado profesional
4-Listado obras
0-Salir'.
op:=(Prompter prompt: 'Ingrese opcion: ' )asNumber asInteger.
(op=1||op=2||op=3||op=4||op=0)whileFalse: [
op:=(Prompter prompt: 'Ingrese opcion: ' )asNumber asInteger.
].
].
].
(tipo=2)ifTrue: [
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
(op=1||op=2||op=3||op=4||op=5||op=6||op=7||op=0)whileFalse: [
op:=(Prompter prompt: 'Ingrese opcion: ' )asNumber asInteger.
].
].
].! !
!Clinica categoriesForMethods!
cargaLisProf!public! !
inicio!public! !
menu!public! !
!

Persona guid: (GUID fromString: '{e058e5f6-559b-4727-a59e-5cb3932eb0a1}')!
Persona comment: ''!
!Persona categoriesForClass!Kernel-Objects! !
"Binary Globals"!

