package org.openelisglobal.admin.controller;

import java.io.IOException;
import org.openelisglobal.dataexchange.fhir.exception.FhirGeneralException;
import org.openelisglobal.dataexchange.fhir.exception.FhirLocalPersistingException;
import org.openelisglobal.organization.service.OrganizationImportService;
import org.openelisglobal.provider.service.ImportService;
import org.openelisglobal.provider.service.ProviderImportService;
import org.openelisglobal.spring.util.SpringContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/import")
public class ImportController {

    private enum ResourceType {
        ORGANIZATION, PROVIDER
    }

    private void importDataFromFhir(ResourceType resourceType)
            throws FhirLocalPersistingException, FhirGeneralException, IOException {
        ImportService importService;
        switch (resourceType) {
        case ORGANIZATION:
            importService = SpringContext.getBean(OrganizationImportService.class);
            break;
        case PROVIDER:
            importService = SpringContext.getBean(ProviderImportService.class);
            break;
        default:
            // Handle invalid resource type
            throw new UnsupportedOperationException("Unsupported resource type");
        }

        importService.importList();
    }

    @GetMapping(value = "/all")
    public void importAll() throws FhirLocalPersistingException, FhirGeneralException, IOException {
        importDataFromFhir(ResourceType.ORGANIZATION);
        importDataFromFhir(ResourceType.PROVIDER);
    }

    @GetMapping(value = "/organization")
    public void importOrganizations() throws FhirLocalPersistingException, FhirGeneralException, IOException {
        importDataFromFhir(ResourceType.ORGANIZATION);
    }

    @GetMapping(value = "/provider")
    public void importProviders() throws FhirLocalPersistingException, FhirGeneralException, IOException {
        importDataFromFhir(ResourceType.PROVIDER);
    }
}
