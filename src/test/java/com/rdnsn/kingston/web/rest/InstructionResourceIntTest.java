package com.rdnsn.kingston.web.rest;

import com.rdnsn.kingston.JamkingApp;

import com.rdnsn.kingston.domain.Instruction;
import com.rdnsn.kingston.domain.User;
import com.rdnsn.kingston.repository.InstructionRepository;
import com.rdnsn.kingston.service.InstructionService;
import com.rdnsn.kingston.service.dto.InstructionDTO;
import com.rdnsn.kingston.service.mapper.InstructionMapper;
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
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


import static com.rdnsn.kingston.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.rdnsn.kingston.domain.enumeration.InputMimeWrap;
/**
 * Test class for the InstructionResource REST controller.
 *
 * @see InstructionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JamkingApp.class)
public class InstructionResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_INPUT = "AAAAAAAAAA";
    private static final String UPDATED_INPUT = "BBBBBBBBBB";

    private static final InputMimeWrap DEFAULT_INPUT_MIME_WRAP = InputMimeWrap.NONE;
    private static final InputMimeWrap UPDATED_INPUT_MIME_WRAP = InputMimeWrap.BASE64;

    @Autowired
    private InstructionRepository instructionRepository;

    @Mock
    private InstructionRepository instructionRepositoryMock;

    @Autowired
    private InstructionMapper instructionMapper;
    

    @Mock
    private InstructionService instructionServiceMock;

    @Autowired
    private InstructionService instructionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restInstructionMockMvc;

    private Instruction instruction;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InstructionResource instructionResource = new InstructionResource(instructionService);
        this.restInstructionMockMvc = MockMvcBuilders.standaloneSetup(instructionResource)
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
    public static Instruction createEntity(EntityManager em) {
        Instruction instruction = new Instruction()
            .title(DEFAULT_TITLE)
            .input(DEFAULT_INPUT)
            .inputMimeWrap(DEFAULT_INPUT_MIME_WRAP);
        // Add required entity
        User user = UserResourceIntTest.createEntity(em);
        em.persist(user);
        em.flush();
        instruction.setCreator(user);
        return instruction;
    }

    @Before
    public void initTest() {
        instruction = createEntity(em);
    }

    @Test
    @Transactional
    public void createInstruction() throws Exception {
        int databaseSizeBeforeCreate = instructionRepository.findAll().size();

        // Create the Instruction
        InstructionDTO instructionDTO = instructionMapper.toDto(instruction);
        restInstructionMockMvc.perform(post("/api/instructions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(instructionDTO)))
            .andExpect(status().isCreated());

        // Validate the Instruction in the database
        List<Instruction> instructionList = instructionRepository.findAll();
        assertThat(instructionList).hasSize(databaseSizeBeforeCreate + 1);
        Instruction testInstruction = instructionList.get(instructionList.size() - 1);
        assertThat(testInstruction.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testInstruction.getInput()).isEqualTo(DEFAULT_INPUT);
        assertThat(testInstruction.getInputMimeWrap()).isEqualTo(DEFAULT_INPUT_MIME_WRAP);
    }

    @Test
    @Transactional
    public void createInstructionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = instructionRepository.findAll().size();

        // Create the Instruction with an existing ID
        instruction.setId(1L);
        InstructionDTO instructionDTO = instructionMapper.toDto(instruction);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInstructionMockMvc.perform(post("/api/instructions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(instructionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Instruction in the database
        List<Instruction> instructionList = instructionRepository.findAll();
        assertThat(instructionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = instructionRepository.findAll().size();
        // set the field null
        instruction.setTitle(null);

        // Create the Instruction, which fails.
        InstructionDTO instructionDTO = instructionMapper.toDto(instruction);

        restInstructionMockMvc.perform(post("/api/instructions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(instructionDTO)))
            .andExpect(status().isBadRequest());

        List<Instruction> instructionList = instructionRepository.findAll();
        assertThat(instructionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInstructions() throws Exception {
        // Initialize the database
        instructionRepository.saveAndFlush(instruction);

        // Get all the instructionList
        restInstructionMockMvc.perform(get("/api/instructions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(instruction.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].input").value(hasItem(DEFAULT_INPUT.toString())))
            .andExpect(jsonPath("$.[*].inputMimeWrap").value(hasItem(DEFAULT_INPUT_MIME_WRAP.toString())));
    }
    
    public void getAllInstructionsWithEagerRelationshipsIsEnabled() throws Exception {
        InstructionResource instructionResource = new InstructionResource(instructionServiceMock);
        when(instructionServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restInstructionMockMvc = MockMvcBuilders.standaloneSetup(instructionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restInstructionMockMvc.perform(get("/api/instructions?eagerload=true"))
        .andExpect(status().isOk());

        verify(instructionServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllInstructionsWithEagerRelationshipsIsNotEnabled() throws Exception {
        InstructionResource instructionResource = new InstructionResource(instructionServiceMock);
            when(instructionServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restInstructionMockMvc = MockMvcBuilders.standaloneSetup(instructionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restInstructionMockMvc.perform(get("/api/instructions?eagerload=true"))
        .andExpect(status().isOk());

            verify(instructionServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getInstruction() throws Exception {
        // Initialize the database
        instructionRepository.saveAndFlush(instruction);

        // Get the instruction
        restInstructionMockMvc.perform(get("/api/instructions/{id}", instruction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(instruction.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.input").value(DEFAULT_INPUT.toString()))
            .andExpect(jsonPath("$.inputMimeWrap").value(DEFAULT_INPUT_MIME_WRAP.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingInstruction() throws Exception {
        // Get the instruction
        restInstructionMockMvc.perform(get("/api/instructions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInstruction() throws Exception {
        // Initialize the database
        instructionRepository.saveAndFlush(instruction);

        int databaseSizeBeforeUpdate = instructionRepository.findAll().size();

        // Update the instruction
        Instruction updatedInstruction = instructionRepository.findById(instruction.getId()).get();
        // Disconnect from session so that the updates on updatedInstruction are not directly saved in db
        em.detach(updatedInstruction);
        updatedInstruction
            .title(UPDATED_TITLE)
            .input(UPDATED_INPUT)
            .inputMimeWrap(UPDATED_INPUT_MIME_WRAP);
        InstructionDTO instructionDTO = instructionMapper.toDto(updatedInstruction);

        restInstructionMockMvc.perform(put("/api/instructions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(instructionDTO)))
            .andExpect(status().isOk());

        // Validate the Instruction in the database
        List<Instruction> instructionList = instructionRepository.findAll();
        assertThat(instructionList).hasSize(databaseSizeBeforeUpdate);
        Instruction testInstruction = instructionList.get(instructionList.size() - 1);
        assertThat(testInstruction.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testInstruction.getInput()).isEqualTo(UPDATED_INPUT);
        assertThat(testInstruction.getInputMimeWrap()).isEqualTo(UPDATED_INPUT_MIME_WRAP);
    }

    @Test
    @Transactional
    public void updateNonExistingInstruction() throws Exception {
        int databaseSizeBeforeUpdate = instructionRepository.findAll().size();

        // Create the Instruction
        InstructionDTO instructionDTO = instructionMapper.toDto(instruction);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInstructionMockMvc.perform(put("/api/instructions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(instructionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Instruction in the database
        List<Instruction> instructionList = instructionRepository.findAll();
        assertThat(instructionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInstruction() throws Exception {
        // Initialize the database
        instructionRepository.saveAndFlush(instruction);

        int databaseSizeBeforeDelete = instructionRepository.findAll().size();

        // Get the instruction
        restInstructionMockMvc.perform(delete("/api/instructions/{id}", instruction.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Instruction> instructionList = instructionRepository.findAll();
        assertThat(instructionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Instruction.class);
        Instruction instruction1 = new Instruction();
        instruction1.setId(1L);
        Instruction instruction2 = new Instruction();
        instruction2.setId(instruction1.getId());
        assertThat(instruction1).isEqualTo(instruction2);
        instruction2.setId(2L);
        assertThat(instruction1).isNotEqualTo(instruction2);
        instruction1.setId(null);
        assertThat(instruction1).isNotEqualTo(instruction2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(InstructionDTO.class);
        InstructionDTO instructionDTO1 = new InstructionDTO();
        instructionDTO1.setId(1L);
        InstructionDTO instructionDTO2 = new InstructionDTO();
        assertThat(instructionDTO1).isNotEqualTo(instructionDTO2);
        instructionDTO2.setId(instructionDTO1.getId());
        assertThat(instructionDTO1).isEqualTo(instructionDTO2);
        instructionDTO2.setId(2L);
        assertThat(instructionDTO1).isNotEqualTo(instructionDTO2);
        instructionDTO1.setId(null);
        assertThat(instructionDTO1).isNotEqualTo(instructionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(instructionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(instructionMapper.fromId(null)).isNull();
    }
}
