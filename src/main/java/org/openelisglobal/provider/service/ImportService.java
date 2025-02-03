package org.openelisglobal.provider.service;

import java.io.IOException;
import org.openelisglobal.dataexchange.fhir.exception.FhirGeneralException;
import org.openelisglobal.dataexchange.fhir.exception.FhirLocalPersistingException;

public interface ImportService {
    void importList() throws FhirLocalPersistingException, FhirGeneralException, IOException;
}
