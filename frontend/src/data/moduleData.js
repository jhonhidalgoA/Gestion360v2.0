export const moduleData = {
  admin: {
    academic: {
      label: "Gestión académica", 
      color: "#1D6FB8",      
      items: [
        {
          id: "enrollment",
          title: "Matrícula",          
          icon: "how_to_reg",
          to: "/enrollmentPageAdmin",         
        },
        {
          id: "grados",
          title: "Grados y Asignaturas",         
          icon: "menu_book",
          to: "/admin/grados",
        },
        {
          id: "horarios",
          title: "Horarios",          
          icon: "hourglass_bottom",
          to: "/admin/horarios",
        },
        {
          id: "calendario",
          title: "Calendario",         
          icon: "calendar_month",
          to: "/admin/calendario",
        },
        {
          id: "calificaciones",
          title: "Calificaciones y boletines",          
          icon: "grading",
          to: "/admin/calificaciones",
        },
        {
          id: "asistencia",
          title: "Asistencia",          
          icon: "fact_check",
          to: "/admin/asistencia",
        },
      ],
    },
    personas: {
      label: "Comunidad educativa",      
      color:  "#B93368",
      items: [
        {
          id: "estudiantes",
          title: "Estudiantes",          
          icon: "groups",
          to: "/admin/estudiantes",
        },
        {
          id: "docentes",
          title: "Docentes",         
          icon: "app_registration",
          to: "/admin/docentes",
        },
        {
          id: "acudientes",
          title: "Acudientes",          
          icon: "family_restroom",
          to: "/admin/acudientes",
        },
        {
          id: "usuarios",
          title: "Usuarios y Roles",          
          icon: "admin_panel_settings",
          to: "/admin/usuarios",
        },
      ],
    },
    comunidad: {
      label: "Institucional",      
      color: "#1E9E74",
      items: [
        {
          id: "comunicados",
          title: "Comunicados",         
          icon: "campaign",
          to: "/admin/comunicados",
        },
        {
          id: "menu",
          title: "Menú Escolar",         
          icon: "restaurant_menu",
          to: "/admin/menu",
        },
        {
          id: "transporte",
          title: "Transporte",          
          icon: "directions_bus",
          to: "/admin/transporte",
        },
        {
          id: "documentos",
          title: "Documentos",          
          icon: "folder_open",
          to: "/admin/documentos",
        },
      ],
    },
    sistema: {
      label: "Sistema",
      accentColor: "#475569",
      color: "red",
      items: [
        {
          id: "reportes",
          title: "Reportes",          
          icon: "bar_chart",
          to: "/admin/report",
        },
        {
          id: "configuracion",
          title: "Configuración",    
          icon: "settings",
          to: "/admin/configuracion",
        },
        {
          id: "auditoria",
          title: "Auditoría",          
          icon: "manage_search",
          to: "/admin/auditoria",
        },
      ],
    },
    finanzas: {
      label: "Finanzas",
      accentColor: "#0f9b6e",
      color: "green",
      items: [
        {
          id: "pensiones",
          title: "Pensiones y pagos",          
          icon: "payments",
          to: "/admin/pensiones",
        },
        {
          id: "cartera",
          title: "Cartera",        
          icon: "account_balance_wallet",
          to: "/admin/cartera",
        },
        {
          id: "recibos",
          title: "Recibos y facturación",        
          icon: "receipt_long",
          to: "/admin/recibos",
        },
        {
          id: "tarifas",
          title: "Conceptos y tarifas",         
          icon: "sell",
          to: "/admin/tarifas",
        },
      ],
    },
  },

  teacher: [
    {
      id: 1,
      icon: "diamond_shine",
      title: "Calificaciones",
      path: "/assessmentPage",
      gradient: "linear-gradient(135deg, #1D6FB8)",
    },
    {
      id: 2,
      icon: "app_registration",
      title: "Asistencia",
      path: "/attendancePage",
      gradient: "linear-gradient(135deg, #1E9E74)",
    },
    {
      id: 3,
      icon: "checklist_rtl",
      title: "Planeación",
      path: "/planningPage",
      gradient: "linear-gradient(135deg, #7B4FB0)",
    },
    {
      id: 4,
      icon: "format_list_numbered",
      title: "Asignar Tareas",
      path: "/classworkPage",
      gradient: "linear-gradient(135deg, #C97A22)",
    },
    {
      id: 5,
      icon: "table_view",
      title: "Reportes Académicos",
      path: "/reportPage",
      gradient: "linear-gradient(135deg, #0B3D73)",
    },
    {
      id: 6,
      icon: "calendar_month",
      title: "Ver Calendario",
      path: "/calendario",
      gradient: "linear-gradient(135deg, #2F8F87)",
    },
    {
      id: 7,
      icon: "forum",
      title: "Comunicación con Padres",
      path: "/comunicationPage",
      gradient: "linear-gradient(135deg, #B93368)",
    },
    {
      id: 8,
      icon: "folder_eye",
      title: "Observador",
      path: "/observerStudentPage",
      gradient: "linear-gradient(135deg, #55708C)",
    },
  ],
};