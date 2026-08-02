import { useState, useEffect, useCallback } from 'react';
import { 
  mockGrados, 
  mockAsignaturas, 
  mockPeriodos, 
  getEstudiantesByGrupo,
  getDuracionByAsignatura,
  mockTiposPlan,
  simulateApiDelay
} from '../data/mockData';

export const useDynamicForm = (fields) => {
  const [fieldData, setFieldData] = useState({});
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});

  const loadFieldData = useCallback(async (fieldName, dependentValue = null) => {
    const field = fields.find(f => f.name === fieldName);
    if (!field) return;

    setLoading(prev => ({ ...prev, [fieldName]: true }));
    setErrors(prev => ({ ...prev, [fieldName]: null }));

    try {
      // Simular delay de API
      await simulateApiDelay(600);
      
      let data = [];

      // Simular errores aleatorios (20% de probabilidad) para probar el manejo de errores
      if (Math.random() < 0.2) {
        throw new Error('Error de conexión con el servidor');
      }

      // Mapeo de endpoints a datos mock
      if (field.endpoint === '/api/grados' || field.name === 'grupo') {
        data = mockGrados.map(g => ({ value: g.id, label: g.nombre }));
      } 
      else if (field.endpoint === '/api/asignaturas' || field.name === 'asignatura') {
        data = mockAsignaturas.map(a => ({ value: a.id, label: a.nombre }));
      } 
      else if (field.endpoint === '/api/periodos' || field.name === 'periodo') {
        data = mockPeriodos.map(p => ({ value: p.id, label: p.nombre }));
      } 
      else if (field.name === 'estudiante' && dependentValue) {
        const estudiantes = await getEstudiantesByGrupo(dependentValue);
        data = estudiantes.map(e => ({ 
          value: e.id, 
          label: `${e.apellidos} ${e.nombres}` 
        }));
      } 
      else if (field.name === 'duracion' && dependentValue) {
        const duraciones = await getDuracionByAsignatura(dependentValue);
        data = duraciones.map(d => ({ value: d.id, label: d.duracion }));
      }
      else if (field.name === 'tipo') {
        data = mockTiposPlan.map(t => ({ value: t.id, label: t.nombre }));
      }
      else if (field.options) {
        data = field.options;
      }

      setFieldData(prev => ({ ...prev, [fieldName]: data }));
      
    } catch (error) {
      console.error(`Error cargando ${fieldName}:`, error);
      setErrors(prev => ({ 
        ...prev, 
        [fieldName]: error.message || 'Error al cargar datos' 
      }));
    } finally {
      setLoading(prev => ({ ...prev, [fieldName]: false }));
    }
  }, [fields]);

  // Carga inicial
  useEffect(() => {
    fields.forEach(field => {
      if (!field.dependsOn || field.dependsOn.length === 0) {
        loadFieldData(field.name);
      }
    });
  }, [fields, loadFieldData]);

  // Manejo de cambios
  const handleFieldChange = useCallback((fieldName, value) => {
    setFormValues(prev => ({ ...prev, [fieldName]: value }));

    const dependentFields = fields.filter(f => 
      f.dependsOn && f.dependsOn.includes(fieldName)
    );

    dependentFields.forEach(depField => {
      setFormValues(prev => ({ ...prev, [depField.name]: '' }));
      setFieldData(prev => ({ ...prev, [depField.name]: [] }));
      
      if (value) {
        loadFieldData(depField.name, value);
      }
    });
  }, [fields, loadFieldData]);

  const getFieldData = (fieldName) => {
    return fieldData[fieldName] || [];
  };

  const isFieldLoading = (fieldName) => {
    return loading[fieldName] || false;
  };

  const getFieldError = (fieldName) => {
    return errors[fieldName];
  };

  const isFieldDisabled = (fieldName) => {
    const field = fields.find(f => f.name === fieldName);
    
    if (field?.dependsOn && field.dependsOn.length > 0) {
      const dependenciesFilled = field.dependsOn.every(dep => 
        formValues[dep] && formValues[dep] !== ''
      );
      return !dependenciesFilled || loading[fieldName];
    }
    
    return loading[fieldName];
  };

  return {
    formValues,
    setFormValues,
    getFieldData,
    isFieldLoading,
    getFieldError,
    isFieldDisabled,
    handleFieldChange,
  };
};

export default useDynamicForm;