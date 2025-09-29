export interface ObservationPDFSchema {
  header: {
    number: {
      label: string
      value: string
    }
    code: {
      label: string
      value: string
    }
    date: {
      label: string
      value: string
    }
    school_name: {
      label: string
      value: string
    }
    department: {
      label: string
      value: string
    }
  }
  body: {
    observations_report: {
      title: {
        label: string
      }
      col1: {
        label: string
      }
      col2: {
        label: string
      }
      col3: {
        label: string
      }
      col4: {
        label: string
      }
    }
    amount: {
      label: string
      value: string
    }
    note: {
      label: string
      value: string
    }
  }
  footer: {
    signs: {
      liquidador: {
        value: string
        person: string
      }
      deliveredTo: {
        label: string
        fields: string
        person: string
      }
    }
  }
}
