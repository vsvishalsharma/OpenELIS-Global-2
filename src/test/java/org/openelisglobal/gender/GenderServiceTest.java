package org.openelisglobal.gender;

import java.sql.Timestamp;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.openelisglobal.BaseWebContextSensitiveTest;
import org.openelisglobal.gender.service.GenderService;
import org.openelisglobal.gender.valueholder.Gender;
import org.springframework.beans.factory.annotation.Autowired;

public class GenderServiceTest extends BaseWebContextSensitiveTest {

    @Autowired
    GenderService genderService;

    @PersistenceContext
    private EntityManager entityManager;

    @Before
    public void init() throws Exception {
        executeDataSetWithStateManagement("testdata/gender.xml");
    }

    @Test
    public void verifyTestData() {
        List<Gender> genders = genderService.getAll();
        System.out.println("Genders we have in db: " + genders.size());
        genders.forEach(gender -> System.out
                .println(gender.getId() + " - " + gender.getGenderType() + " - " + gender.getDescription()));

    }

    @Test
    public void createGender_shouldCreateNewGender() throws Exception {
        List<Gender> genders = genderService.getAll();
        boolean genderExists = genders.stream().anyMatch(g -> "M".equals(g.getGenderType()));

        if (!genderExists) {
            Gender gender = createGender("M", "Male");
            Integer savedGenderId = genderService.insert(gender);

            Gender savedGender = genderService.get(savedGenderId);
            Assert.assertEquals("M", savedGender.getGenderType());
            Assert.assertNotNull(savedGender.getId());
        }
    }

    @Test
    public void getAllGenders_shouldReturnAllGenders() throws Exception {
        List<Gender> genders = genderService.getAll();
        Assert.assertEquals(3, genders.size());
    }

    @Test
    public void getGenderByType_shouldReturnGenderByType() throws Exception {
        List<Gender> genders = genderService.getAll();
        boolean genderExists = genders.stream().anyMatch(g -> "M".equals(g.getGenderType()));

        if (!genderExists) {
            Gender gender = createGender("M", "Male");
            genderService.insert(gender);
        }

        Gender genderByType = genderService.getGenderByType("M");
        Assert.assertNotNull(genderByType);
        Assert.assertEquals("M", genderByType.getGenderType());
    }

    private Gender createGender(String genderType, String description) {
        Gender gender = new Gender();
        gender.setGenderType(genderType);
        gender.setDescription(description);
        gender.setLastupdated(new Timestamp(System.currentTimeMillis()));
        return gender;
    }
}
