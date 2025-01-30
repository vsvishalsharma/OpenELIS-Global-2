package org.openelisglobal.program.service;

import org.openelisglobal.common.service.AuditableBaseObjectServiceImpl;
import org.openelisglobal.program.dao.PathologyBlockDAO;
import org.openelisglobal.program.valueholder.pathology.PathologyBlock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PathologyBlockServiceImpl extends AuditableBaseObjectServiceImpl<PathologyBlock, Integer>
        implements PathologyBlockService {

    @Autowired
    protected PathologyBlockDAO baseObjectDAO;

    PathologyBlockServiceImpl() {
        super(PathologyBlock.class);
    }

    @Override
    protected PathologyBlockDAO getBaseObjectDAO() {
        return baseObjectDAO;
    }
}
