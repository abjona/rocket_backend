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

import io.swagger.client.model.InlineResponse200
import io.swagger.client.model.InlineResponse2001
import io.swagger.client.model.InlineResponse404
import io.swagger.client.model.InlineResponse409
import io.swagger.client.model.User
import io.swagger.client.model.UserInfo
import io.swagger.client.core._
import io.swagger.client.core.CollectionFormats._
import io.swagger.client.core.ApiKeyLocations._

object UserApi {

  /**
   * login users
   * 
   * Expected answers:
   *   code 200 : InlineResponse2001 (result)
   *   code 404 : InlineResponse404 (result)
   * 
   * @param userInfo 
   */
  def loginPost(userInfo: Option[UserInfo] = None): ApiRequest[InlineResponse2001] =
    ApiRequest[InlineResponse2001](ApiMethods.POST, "https://virtserver.swaggerhub.com/abjona/RocketInterplantetApi/1.0.0", "/login", "application/json")
      .withBody(userInfo)
      .withSuccessResponse[InlineResponse2001](200)
      .withErrorResponse[InlineResponse404](404)
        /**
   * store user or admin
   * 
   * Expected answers:
   *   code 200 : InlineResponse200 (result)
   *   code 409 : InlineResponse409 (result)
   * 
   * @param user user info
   */
  def storePost(user: Option[User] = None): ApiRequest[InlineResponse200] =
    ApiRequest[InlineResponse200](ApiMethods.POST, "https://virtserver.swaggerhub.com/abjona/RocketInterplantetApi/1.0.0", "/store", "application/json")
      .withBody(user)
      .withSuccessResponse[InlineResponse200](200)
      .withErrorResponse[InlineResponse409](409)
      

}

