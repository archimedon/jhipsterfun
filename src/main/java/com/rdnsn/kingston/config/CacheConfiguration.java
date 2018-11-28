package com.rdnsn.kingston.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.rdnsn.kingston.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.rdnsn.kingston.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.rdnsn.kingston.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.rdnsn.kingston.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.rdnsn.kingston.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.rdnsn.kingston.domain.Question.class.getName(), jcacheConfiguration);
            cm.createCache(com.rdnsn.kingston.domain.Question.class.getName() + ".answers", jcacheConfiguration);
            cm.createCache(com.rdnsn.kingston.domain.Question.class.getName() + ".files", jcacheConfiguration);
            cm.createCache(com.rdnsn.kingston.domain.Question.class.getName() + ".lessons", jcacheConfiguration);
            cm.createCache(com.rdnsn.kingston.domain.Answer.class.getName(), jcacheConfiguration);
            cm.createCache(com.rdnsn.kingston.domain.Answer.class.getName() + ".files", jcacheConfiguration);
            cm.createCache(com.rdnsn.kingston.domain.Track.class.getName(), jcacheConfiguration);
            cm.createCache(com.rdnsn.kingston.domain.Track.class.getName() + ".courses", jcacheConfiguration);
            cm.createCache(com.rdnsn.kingston.domain.Lesson.class.getName(), jcacheConfiguration);
            cm.createCache(com.rdnsn.kingston.domain.Lesson.class.getName() + ".instructions", jcacheConfiguration);
            cm.createCache(com.rdnsn.kingston.domain.Lesson.class.getName() + ".questions", jcacheConfiguration);
            cm.createCache(com.rdnsn.kingston.domain.Lesson.class.getName() + ".courses", jcacheConfiguration);
            cm.createCache(com.rdnsn.kingston.domain.Course.class.getName(), jcacheConfiguration);
            cm.createCache(com.rdnsn.kingston.domain.Course.class.getName() + ".lessons", jcacheConfiguration);
            cm.createCache(com.rdnsn.kingston.domain.Course.class.getName() + ".tracks", jcacheConfiguration);
            cm.createCache(com.rdnsn.kingston.domain.Instruction.class.getName(), jcacheConfiguration);
            cm.createCache(com.rdnsn.kingston.domain.Instruction.class.getName() + ".files", jcacheConfiguration);
            cm.createCache(com.rdnsn.kingston.domain.Instruction.class.getName() + ".lessons", jcacheConfiguration);
            cm.createCache(com.rdnsn.kingston.domain.File.class.getName(), jcacheConfiguration);
            cm.createCache(com.rdnsn.kingston.domain.File.class.getName() + ".instructions", jcacheConfiguration);
            cm.createCache(com.rdnsn.kingston.domain.File.class.getName() + ".answers", jcacheConfiguration);
            cm.createCache(com.rdnsn.kingston.domain.File.class.getName() + ".questions", jcacheConfiguration);
            cm.createCache(com.rdnsn.kingston.domain.Category.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
