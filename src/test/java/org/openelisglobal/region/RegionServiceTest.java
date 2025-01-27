package org.openelisglobal.region;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.openelisglobal.BaseWebContextSensitiveTest;
import org.openelisglobal.region.service.RegionService;
import org.openelisglobal.region.valueholder.Region;
import org.springframework.beans.factory.annotation.Autowired;

public class RegionServiceTest extends BaseWebContextSensitiveTest {

    @Autowired
    RegionService regionService;

    private Map<String, String> testRegions;

    @Before
    public void init() throws Exception {
        executeDataSetWithStateManagement("testdata/region.xml");
    }

    @After
    public void tearDown() {
        List<Region> regions = regionService.getAll();
        for (Region region : regions) {
            if (region.getLastupdated() == null) {
                region.setLastupdated(new Timestamp(System.currentTimeMillis()));
            }
        }
        regionService.deleteAll(regions);

    }

    @Test
    public void createRegion_shouldCreateNewRegion() throws Exception {
        String regionName = "Midwest";
        String regionId = "1";
        Region region = createRegion(regionName, regionId);

        String savedRegionId = regionService.insert(region);

        Region savedRegion = regionService.get(savedRegionId);
        Assert.assertEquals(regionName, savedRegion.getRegion());
        Assert.assertNotNull(savedRegion.getId());
    }

    @Test
    public void updateRegion_shouldUpdateRegionInformation() throws Exception {
        String regionName = "Northeast";
        String regionId = "2";
        Region region = createRegion(regionName, regionId);
        String savedRegionId = regionService.insert(region);
        Region savedRegion = regionService.get(savedRegionId);
        savedRegion.setRegion("Southeast");
        regionService.update(savedRegion);
        Region updatedRegion = regionService.get(savedRegionId);
        Assert.assertEquals("Southeast", updatedRegion.getRegion());
    }

    @Test
    public void getAllRegions_shouldReturnAllRegions() throws Exception {
        List<Region> initialRegions = regionService.getAll();
        Assert.assertEquals(5, initialRegions.size());

        Region region = new Region();
        region.setRegion("Southwest");
        region.setLastupdated(new Timestamp(System.currentTimeMillis()));
        regionService.insert(region);

        List<Region> updatedRegions = regionService.getAll();
        Assert.assertEquals(6, updatedRegions.size());
    }

    @Test
    public void deleteRegion_shouldRemoveRegion() throws Exception {
        Assert.assertEquals(5, regionService.getAll().size());

        Region region = createRegion("Northwest", "9");
        regionService.insert(region);
        Assert.assertEquals(6, regionService.getAll().size());

        regionService.delete(region);
        Assert.assertEquals(5, regionService.getAll().size());
    }

    private Region createRegion(String regionName, String regionId) {
        Region region = new Region();
        region.setRegion(regionName);
        region.setLastupdated(new Timestamp(System.currentTimeMillis()));
        return region;
    }
}