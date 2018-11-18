package com.rdnsn.kingston.web.rest;

import com.rdnsn.kingston.JamkingApp;

import com.rdnsn.kingston.domain.Answer;
import com.rdnsn.kingston.domain.Question;
import com.rdnsn.kingston.repository.AnswerRepository;
import com.rdnsn.kingston.service.AnswerService;
import com.rdnsn.kingston.service.dto.AnswerDTO;
import com.rdnsn.kingston.service.mapper.AnswerMapper;
import com.rdnsn.kingston.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


import static com.rdnsn.kingston.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AnswerResource REST controller.
 *
 * @see AnswerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JamkingApp.class)
public class AnswerResourceIntTest {

    private static final String DEFAULT_POSIT = "AAAAAAAAAA";
    private static final String UPDATED_POSIT = "BBBBBBBBBB";

    private static final Boolean DEFAULT_CORRECT = false;
    private static final Boolean UPDATED_CORRECT = true;

    private static final Boolean DEFAULT_USE_POSIT_WITH_FILE = false;
    private static final Boolean UPDATED_USE_POSIT_WITH_FILE = true;

    @Autowired
    private AnswerRepository answerRepository;

    @Mock
    private AnswerRepository answerRepositoryMock;

    @Autowired
    private AnswerMapper answerMapper;
    

    @Mock
    private AnswerService answerServiceMock;

    @Autowired
    private AnswerService answerService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAnswerMockMvc;

    private Answer answer;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AnswerResource answerResource = new AnswerResource(answerService);
        this.restAnswerMockMvc = MockMvcBuilders.standaloneSetup(answerResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Answer createEntity(EntityManager em) {
        Answer answer = new Answer()
            .posit(DEFAULT_POSIT)
            .correct(DEFAULT_CORRECT)
            .usePositWithFile(DEFAULT_USE_POSIT_WITH_FILE);
        // Add required entity
        Question question = QuestionResourceIntTest.createEntity(em);
        em.persist(question);
        em.flush();
        answer.setQuestion(question);
        return answer;
    }

    @Before
    public void initTest() {
        answer = createEntity(em);
    }

    @Test
    @Transactional
    public void createAnswer() throws Exception {
        int databaseSizeBeforeCreate = answerRepository.findAll().size();

        // Create the Answer
        AnswerDTO answerDTO = answerMapper.toDto(answer);
        restAnswerMockMvc.perform(post("/api/answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(answerDTO)))
            .andExpect(status().isCreated());

        // Validate the Answer in the database
        List<Answer> answerList = answerRepository.findAll();
        assertThat(answerList).hasSize(databaseSizeBeforeCreate + 1);
        Answer testAnswer = answerList.get(answerList.size() - 1);
        assertThat(testAnswer.getPosit()).isEqualTo(DEFAULT_POSIT);
        assertThat(testAnswer.isCorrect()).isEqualTo(DEFAULT_CORRECT);
        assertThat(testAnswer.isUsePositWithFile()).isEqualTo(DEFAULT_USE_POSIT_WITH_FILE);
    }

    @Test
    @Transactional
    public void createAnswerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = answerRepository.findAll().size();

        // Create the Answer with an existing ID
        answer.setId(1L);
        AnswerDTO answerDTO = answerMapper.toDto(answer);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnswerMockMvc.perform(post("/api/answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(answerDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Answer in the database
        List<Answer> answerList = answerRepository.findAll();
        assertThat(answerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPositIsRequired() throws Exception {
        int databaseSizeBeforeTest = answerRepository.findAll().size();
        // set the field null
        answer.setPosit(null);

        // Create the Answer, which fails.
        AnswerDTO answerDTO = answerMapper.toDto(answer);

        restAnswerMockMvc.perform(post("/api/answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(answerDTO)))
            .andExpect(status().isBadRequest());

        List<Answer> answerList = answerRepository.findAll();
        assertThat(answerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCorrectIsRequired() throws Exception {
        int databaseSizeBeforeTest = answerRepository.findAll().size();
        // set the field null
        answer.setCorrect(null);

        // Create the Answer, which fails.
        AnswerDTO answerDTO = answerMapper.toDto(answer);

        restAnswerMockMvc.perform(post("/api/answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(answerDTO)))
            .andExpect(status().isBadRequest());

        List<Answer> answerList = answerRepository.findAll();
        assertThat(answerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUsePositWithFileIsRequired() throws Exception {
        int databaseSizeBeforeTest = answerRepository.findAll().size();
        // set the field null
        answer.setUsePositWithFile(null);

        // Create the Answer, which fails.
        AnswerDTO answerDTO = answerMapper.toDto(answer);

        restAnswerMockMvc.perform(post("/api/answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(answerDTO)))
            .andExpect(status().isBadRequest());

        List<Answer> answerList = answerRepository.findAll();
        assertThat(answerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAnswers() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        // Get all the answerList
        restAnswerMockMvc.perform(get("/api/answers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(answer.getId().intValue())))
            .andExpect(jsonPath("$.[*].posit").value(hasItem(DEFAULT_POSIT.toString())))
            .andExpect(jsonPath("$.[*].correct").value(hasItem(DEFAULT_CORRECT.booleanValue())))
            .andExpect(jsonPath("$.[*].usePositWithFile").value(hasItem(DEFAULT_USE_POSIT_WITH_FILE.booleanValue())));
    }
    
    public void getAllAnswersWithEagerRelationshipsIsEnabled() throws Exception {
        AnswerResource answerResource = new AnswerResource(answerServiceMock);
        when(answerServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restAnswerMockMvc = MockMvcBuilders.standaloneSetup(answerResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restAnswerMockMvc.perform(get("/api/answers?eagerload=true"))
        .andExpect(status().isOk());

        verify(answerServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllAnswersWithEagerRelationshipsIsNotEnabled() throws Exception {
        AnswerResource answerResource = new AnswerResource(answerServiceMock);
            when(answerServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restAnswerMockMvc = MockMvcBuilders.standaloneSetup(answerResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restAnswerMockMvc.perform(get("/api/answers?eagerload=true"))
        .andExpect(status().isOk());

            verify(answerServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getAnswer() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        // Get the answer
        restAnswerMockMvc.perform(get("/api/answers/{id}", answer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(answer.getId().intValue()))
            .andExpect(jsonPath("$.posit").value(DEFAULT_POSIT.toString()))
            .andExpect(jsonPath("$.correct").value(DEFAULT_CORRECT.booleanValue()))
            .andExpect(jsonPath("$.usePositWithFile").value(DEFAULT_USE_POSIT_WITH_FILE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAnswer() throws Exception {
        // Get the answer
        restAnswerMockMvc.perform(get("/api/answers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAnswer() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        int databaseSizeBeforeUpdate = answerRepository.findAll().size();

        // Update the answer
        Answer updatedAnswer = answerRepository.findById(answer.getId()).get();
        // Disconnect from session so that the updates on updatedAnswer are not directly saved in db
        em.detach(updatedAnswer);
        updatedAnswer
            .posit(UPDATED_POSIT)
            .correct(UPDATED_CORRECT)
            .usePositWithFile(UPDATED_USE_POSIT_WITH_FILE);
        AnswerDTO answerDTO = answerMapper.toDto(updatedAnswer);

        restAnswerMockMvc.perform(put("/api/answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(answerDTO)))
            .andExpect(status().isOk());

        // Validate the Answer in the database
        List<Answer> answerList = answerRepository.findAll();
        assertThat(answerList).hasSize(databaseSizeBeforeUpdate);
        Answer testAnswer = answerList.get(answerList.size() - 1);
        assertThat(testAnswer.getPosit()).isEqualTo(UPDATED_POSIT);
        assertThat(testAnswer.isCorrect()).isEqualTo(UPDATED_CORRECT);
        assertThat(testAnswer.isUsePositWithFile()).isEqualTo(UPDATED_USE_POSIT_WITH_FILE);
    }

    @Test
    @Transactional
    public void updateNonExistingAnswer() throws Exception {
        int databaseSizeBeforeUpdate = answerRepository.findAll().size();

        // Create the Answer
        AnswerDTO answerDTO = answerMapper.toDto(answer);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnswerMockMvc.perform(put("/api/answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(answerDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Answer in the database
        List<Answer> answerList = answerRepository.findAll();
        assertThat(answerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAnswer() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        int databaseSizeBeforeDelete = answerRepository.findAll().size();

        // Get the answer
        restAnswerMockMvc.perform(delete("/api/answers/{id}", answer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Answer> answerList = answerRepository.findAll();
        assertThat(answerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Answer.class);
        Answer answer1 = new Answer();
        answer1.setId(1L);
        Answer answer2 = new Answer();
        answer2.setId(answer1.getId());
        assertThat(answer1).isEqualTo(answer2);
        answer2.setId(2L);
        assertThat(answer1).isNotEqualTo(answer2);
        answer1.setId(null);
        assertThat(answer1).isNotEqualTo(answer2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AnswerDTO.class);
        AnswerDTO answerDTO1 = new AnswerDTO();
        answerDTO1.setId(1L);
        AnswerDTO answerDTO2 = new AnswerDTO();
        assertThat(answerDTO1).isNotEqualTo(answerDTO2);
        answerDTO2.setId(answerDTO1.getId());
        assertThat(answerDTO1).isEqualTo(answerDTO2);
        answerDTO2.setId(2L);
        assertThat(answerDTO1).isNotEqualTo(answerDTO2);
        answerDTO1.setId(null);
        assertThat(answerDTO1).isNotEqualTo(answerDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(answerMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(answerMapper.fromId(null)).isNull();
    }
}
