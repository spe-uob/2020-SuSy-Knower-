package com.SuSyKnower.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Configuration
public class Webconfig {

    @Bean(name = "db_SusyKnower")
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource dataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "jdbcTemplateUnit")
    public JdbcTemplate jdbcTemplateUnit(@Qualifier("db_SusyKnower") DataSource ds) {
        return new JdbcTemplate(ds);
    }


}
