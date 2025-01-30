package org.openelisglobal.program.dao;

import org.openelisglobal.common.daoimpl.BaseDAOImpl;
import org.openelisglobal.program.valueholder.pathology.PathologyBlock;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Transactional
public class PathologyBlockDaoImpl extends BaseDAOImpl<PathologyBlock, Integer> implements PathologyBlockDAO {

    PathologyBlockDaoImpl() {
        super(PathologyBlock.class);
    }
}
