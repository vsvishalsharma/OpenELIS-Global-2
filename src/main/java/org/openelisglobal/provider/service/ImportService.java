package org.openelisglobal.provider.service;

import org.openelisglobal.dataexchange.fhir.exception.FhirGeneralException;
import org.openelisglobal.dataexchange.fhir.exception.FhirLocalPersistingException;

import java.io.IOException;

public interface ImportService {
    void importList() throws FhirLocalPersistingException, FhirGeneralException, IOException;
}
