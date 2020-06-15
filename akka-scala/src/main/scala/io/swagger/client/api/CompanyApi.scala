/**
 * Rocket Interplanet API
 * Rocket api
 *
 * OpenAPI spec version: 1.0.0
 * Contact: abjonathan@hotmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package io.swagger.client.api

import io.swagger.client.model.Company
import io.swagger.client.model.CompanyInfo
import io.swagger.client.model.CompanyInfo1
import io.swagger.client.model.CompanyInfo2
import io.swagger.client.model.InlineResponse2002
import io.swagger.client.model.InlineResponse2003
import io.swagger.client.model.InlineResponse2004
import io.swagger.client.core._
import io.swagger.client.core.CollectionFormats._
import io.swagger.client.core.ApiKeyLocations._

object CompanyApi {

  /**
   * available company
   * 
   * Expected answers:
   *   code 200 : InlineResponse2004 (result)
   * 
   * Available security schemes:
   *   Bearer (apiKey)
   * 
   * @param companyInfo 
   */
  def companyAvailablePost(companyInfo: Option[CompanyInfo2] = None)(implicit apiKey: ApiKeyValue): ApiRequest[InlineResponse2004] =
    ApiRequest[InlineResponse2004](ApiMethods.POST, "https://virtserver.swaggerhub.com/abjona/RocketInterplantetApi/1.0.0", "/company/available", "application/json")
      .withApiKey(apiKey, "Authorization", HEADER)
      .withBody(companyInfo)
      .withSuccessResponse[InlineResponse2004](200)
        /**
   * get companies
   * 
   * Expected answers:
   *   code 200 : Company (list companies)
   * 
   * Available security schemes:
   *   Bearer (apiKey)
   */
  def companyGetGet()(implicit apiKey: ApiKeyValue): ApiRequest[Company] =
    ApiRequest[Company](ApiMethods.GET, "https://virtserver.swaggerhub.com/abjona/RocketInterplantetApi/1.0.0", "/company/get", "application/json")
      .withApiKey(apiKey, "Authorization", HEADER)
      .withSuccessResponse[Company](200)
        /**
   * store company
   * 
   * Expected answers:
   *   code 200 : InlineResponse2002 (result)
   * 
   * Available security schemes:
   *   Bearer (apiKey)
   * 
   * @param companyInfo 
   */
  def companyStorePost(companyInfo: Option[CompanyInfo] = None)(implicit apiKey: ApiKeyValue): ApiRequest[InlineResponse2002] =
    ApiRequest[InlineResponse2002](ApiMethods.POST, "https://virtserver.swaggerhub.com/abjona/RocketInterplantetApi/1.0.0", "/company/store", "application/json")
      .withApiKey(apiKey, "Authorization", HEADER)
      .withBody(companyInfo)
      .withSuccessResponse[InlineResponse2002](200)
        /**
   * update company
   * 
   * Expected answers:
   *   code 200 : InlineResponse2003 (result)
   * 
   * Available security schemes:
   *   Bearer (apiKey)
   * 
   * @param companyInfo 
   */
  def companyUpdatePut(companyInfo: Option[CompanyInfo1] = None)(implicit apiKey: ApiKeyValue): ApiRequest[InlineResponse2003] =
    ApiRequest[InlineResponse2003](ApiMethods.PUT, "https://virtserver.swaggerhub.com/abjona/RocketInterplantetApi/1.0.0", "/company/update", "application/json")
      .withApiKey(apiKey, "Authorization", HEADER)
      .withBody(companyInfo)
      .withSuccessResponse[InlineResponse2003](200)
      

}

