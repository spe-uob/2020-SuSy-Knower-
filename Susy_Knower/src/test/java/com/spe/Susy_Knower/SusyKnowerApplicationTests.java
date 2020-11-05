package com.spe.Susy_Knower;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SusyKnowerApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void firstTest() {
		assert(WebController.nameShadow == "a");
	}

}
