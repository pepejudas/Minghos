/*
just a example of process definition to be used on process diagram flow
*/
const proceso= {
            "proceso" : "Atencion de Urgencias",
            "idproceso" : "001",
            "etapas" : [ 
                {
                    "tipo" : "limite Inicial",
                    "nombre" : "inicia",
                    "id" : 0
                }, 
                {
                    "tipo" : "Actividad",
                    "nombre" : "Recibir al usuario y tomar los signos vitales",
                    "reponsables" : [ 
                        "Auxiliar de enfermeria"
                    ],
                    "id" : 1,
                    "conexiones" : [ 
                        0
                    ]
                }, 
                {
                    "tipo" : "Actividad",
                    "nombre" : "Evaluar el estado del usuario",
                    "reponsables" : [ 
                        "Medico"
                    ],
                    "id" : 2,
                    "conexiones" : [ 
                        1
                    ]
                }, 
                {
                    "tipo" : "Decision",
                    "nombre" : "Urgencia Vital",
                    "reponsables" : [ 
                        "Medico"
                    ],
                    "id" : 3,
                    "conexiones" : [ 
                        2
                    ]
                }, 
                {
                    "tipo" : "Decision",
                    "nombre" : "Consulta Prioritaria por urgencias",
                    "reponsables" : [ 
                        "Medico"
                    ],
                    "id" : 5,
                    "conexiones" : [ 
                        4
                    ],
                    "decision" : "no"
                }, 
                {
                    "tipo" : "Actividad",
                    "nombre" : "Comprobar derechos del usuario",
                    "reponsables" : [ 
                        "Auxiliar administrativo"
                    ],
                    "id" : 6,
                    "conexiones" : [ 
                        5
                    ],
                    "decision" : "si"
                }, 
                {
                    "tipo" : "Decision",
                    "nombre" : "Tiene Historia Clinica",
                    "reponsables" : [ 
                        "Auxiliar administrativo"
                    ],
                    "id" : 8,
                    "conexiones" : [ 
                        6
                    ]
                }, 
                {
                    "tipo" : "Actividad",
                    "nombre" : "Abrir Historia Clinica",
                    "reponsables" : [ 
                        "Auxiliar administrativo"
                    ],
                    "id" : 10,
                    "conexiones" : [ 
                        8
                    ],
                    "decision" : "no"
                }, 
                {
                    "tipo" : "Actividad",
                    "nombre" : "Actualizar la historia clinica del usuario",
                    "reponsables" : [ 
                        "Auxiliar administrativo"
                    ],
                    "id" : 9,
                    "conexiones" : [ 
                        8, 
                        10
                    ],
                    "decision" : "si"
                }, 
                {
                    "tipo" : "Proceso",
                    "nombre" : "Consulta Medica General",
                    "reponsables" : [],
                    "id" : 7,
                    "conexiones" : [ 
                        6
                    ],
                    "decision" : "no"
                }, 
                {
                    "tipo" : "Actividad",
                    "nombre" : "Realizar la atencion medica y de enfermeria",
                    "reponsables" : [ 
                        "Medico", 
                        "Enfermera", 
                        "Auxiliar de Enfermeria"
                    ],
                    "id" : 4,
                    "conexiones" : [ 
                        3, 
                        9, 
                        11
                    ]
                }, 
                {
                    "tipo" : "Decision",
                    "nombre" : "Requiere Ayudas",
                    "reponsables" : [ 
                        "Auxiliar administrativo"
                    ],
                    "id" : 11,
                    "conexiones" : [ 
                        6
                    ]
                }, 
                {
                    "tipo" : "Proceso",
                    "nombre" : "Proceso Ayudas",
                    "reponsables" : [],
                    "id" : 12,
                    "conexiones" : [ 
                        11
                    ],
                    "decision" : "si"
                }, 
                {
                    "tipo" : "Actividad",
                    "nombre" : "Decidir la conducta del paciente",
                    "reponsables" : [ 
                        "Medico"
                    ],
                    "id" : 13,
                    "conexiones" : [ 
                        11
                    ],
                    "decision" : "no"
                }, 
                {
                    "tipo" : "Actividad",
                    "nombre" : "Realizar gestiones medicas de enfermeria y administrativas",
                    "reponsables" : [ 
                        "Medico"
                    ],
                    "id" : 14,
                    "conexiones" : [ 
                        13
                    ],
                    "decision" : "no"
                }, 
                {
                    "tipo" : "Actividad",
                    "nombre" : "Diligenciar registros de facturacion y archivo clinico",
                    "reponsables" : [ 
                        "Medico"
                    ],
                    "id" : 15,
                    "conexiones" : [ 
                        14
                    ],
                    "decision" : "no"
                }, 
                {
                    "tipo" : "limite Final",
                    "nombre" : "termina",
                    "id" : 16,
                    "conexiones" : [ 
                        15
                    ]
                }
            ]
};
